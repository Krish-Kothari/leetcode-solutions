// Shared utilities for both local Express server and Vercel serverless functions
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Solutions folder is always relative to the project root
export const SOLUTIONS_DIR = path.join(__dirname, '..', 'solutions');

export function parseFolderName(folderName) {
  const match = folderName.match(/^(\d+)-(.*)$/);
  if (match) {
    const numStr = match[1];
    const rawTitle = match[2];
    const number = parseInt(numStr, 10);
    const title = rawTitle
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return { number, formattedNumber: numStr, title, slug: folderName };
  }
  return { number: 0, formattedNumber: '0000', title: folderName, slug: folderName };
}

export function getLanguage(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.py': return 'python';
    case '.cpp':
    case '.cc':
    case '.cxx': return 'cpp';
    case '.js': return 'javascript';
    case '.ts': return 'typescript';
    case '.java': return 'java';
    case '.sql': return 'sql';
    case '.go': return 'go';
    case '.rs': return 'rust';
    default: return 'text';
  }
}

export function listSolutions() {
  if (!fs.existsSync(SOLUTIONS_DIR)) return [];

  const folders = fs.readdirSync(SOLUTIONS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const list = folders.map(folder => {
    const parsed = parseFolderName(folder);
    const folderPath = path.join(SOLUTIONS_DIR, folder);
    const files = fs.readdirSync(folderPath);
    const codeFile = files.find(f => f !== 'README.md' && !f.startsWith('.'));
    const language = codeFile ? getLanguage(codeFile) : 'python';
    return {
      id: folder,
      number: parsed.number,
      formattedNumber: parsed.formattedNumber,
      title: parsed.title,
      slug: folder,
      language,
      codeFile: codeFile || 'solution.py'
    };
  });

  list.sort((a, b) => a.number - b.number);
  return list;
}

export function getSolution(slug) {
  const folderPath = path.join(SOLUTIONS_DIR, slug);
  if (!fs.existsSync(folderPath)) return null;

  const parsed = parseFolderName(slug);
  const filesInFolder = fs.readdirSync(folderPath);

  let questionContent = '';
  const readmePath = path.join(folderPath, 'README.md');
  if (fs.existsSync(readmePath)) {
    questionContent = fs.readFileSync(readmePath, 'utf-8');
  }

  const codeFiles = filesInFolder
    .filter(f => f !== 'README.md' && !f.startsWith('.'))
    .map(fileName => {
      const filePath = path.join(folderPath, fileName);
      const content = fs.readFileSync(filePath, 'utf-8');
      return { fileName, language: getLanguage(fileName), content };
    });

  const mainCode = codeFiles.length > 0 ? codeFiles[0].content : '';
  const mainLanguage = codeFiles.length > 0 ? codeFiles[0].language : 'python';

  return {
    id: slug,
    number: parsed.number,
    formattedNumber: parsed.formattedNumber,
    title: parsed.title,
    slug,
    questionContent,
    codeFiles,
    code: mainCode,
    language: mainLanguage
  };
}

export function generateFallbackExplanation({ title, code, language, mode, userQuery }) {
  if (mode === 'chat' && userQuery) {
    return `### Answer to: "${userQuery}"\n\nBased on your **${language}** implementation for **${title}**:\n\n- The code processes elements sequentially and checks constraints specified in the problem statement.\n- To modify or optimize this logic, consider how variables update on each iteration.\n\n*Tip: Connect a Gemini API key in Settings for instant, interactive AI responses tailored to any custom question!*`;
  }

  if (mode === 'line-by-line') {
    const lines = code.split('\n');
    let lineBreakdown = `### Line-by-Line Code Breakdown\n\n`;
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed) {
        lineBreakdown += `**Line ${idx + 1}**: \`${trimmed}\`  \n> Executes this step in the algorithm's logic.\n\n`;
      }
    });
    return lineBreakdown;
  }

  if (mode === 'complexity') {
    return `### Time & Space Complexity Analysis\n\n#### Time Complexity: O(N) to O(N²)\n- Operations execute proportional to input size N based on loop depth.\n\n#### Space Complexity: O(1) to O(N)\n- Auxiliary memory depends on allocated data structures.\n\n*For precise bounds, enable Gemini AI in Settings.*`;
  }

  if (mode === 'dry-run') {
    return `### Execution Trace & Dry Run\n\n#### Initial State\n- Input initialized from problem specification.\n\n#### Step Trace\n1. Begin execution loop over input elements.\n2. Evaluate conditional criteria.\n3. Return result once target condition is met.\n\n#### Output\n- Returns computed result matching problem expectations.`;
  }

  return `### Solution Explanation for ${title}\n\n#### 💡 Approach Overview\nThis solution implements an algorithmic approach in **${language.toUpperCase()}** to address the problem requirements.\n\n#### ⚙️ How It Works\n1. **Input Parsing & Initialization**: Receives input parameters and initializes key variables.\n2. **Main Algorithm Logic**: Iterates over data, evaluating rules and building the result.\n3. **Return Value**: Computes and returns the expected result.\n\n#### 📊 Quick Complexity\n- **Time Complexity**: Based on loop depth and operations.\n- **Space Complexity**: Based on memory usage.\n\n---\n*💡 Tip: Add your Google Gemini API Key in Settings for live AI explanations!*`;
}
