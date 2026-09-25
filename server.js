import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const SOLUTIONS_DIR = path.join(__dirname, 'solutions');

// Helper to format folder name into clean title & number
function parseFolderName(folderName) {
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

// Get file language from extension
function getLanguage(filename) {
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

// Endpoint: List all solutions
app.get('/api/solutions', (req, res) => {
  try {
    if (!fs.existsSync(SOLUTIONS_DIR)) {
      return res.json({ success: true, solutions: [] });
    }

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

    // Sort by problem number ascending
    list.sort((a, b) => a.number - b.number);

    res.json({ success: true, solutions: list });
  } catch (error) {
    console.error('Error fetching solutions list:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: Get specific solution details
app.get('/api/solutions/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const folderPath = path.join(SOLUTIONS_DIR, slug);

    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ success: false, error: 'Solution not found' });
    }

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
        return {
          fileName,
          language: getLanguage(fileName),
          content
        };
      });

    const mainCode = codeFiles.length > 0 ? codeFiles[0].content : '';
    const mainLanguage = codeFiles.length > 0 ? codeFiles[0].language : 'python';

    res.json({
      success: true,
      data: {
        id: slug,
        number: parsed.number,
        formattedNumber: parsed.formattedNumber,
        title: parsed.title,
        slug,
        questionContent,
        codeFiles,
        code: mainCode,
        language: mainLanguage
      }
    });
  } catch (error) {
    console.error(`Error fetching solution ${req.params.slug}:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: Generate AI Explanation or Answer Question
app.post('/api/explain', async (req, res) => {
  try {
    const { title, question, code, language, mode = 'overview', apiKey, userQuery } = req.body;

    const keyToUse = apiKey || process.env.GEMINI_API_KEY;

    if (keyToUse) {
      try {
        const genAI = new GoogleGenerativeAI(keyToUse);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        let prompt = '';
        if (mode === 'overview') {
          prompt = `You are an expert LeetCode coach and senior software architect.
Explain the following problem and solution clearly.

Problem Title: ${title}
Problem Description:
${question}

User's Code (${language}):
\`\`\`${language}
${code}
\`\`\`

Provide a well-structured response in Markdown with:
1. **Core Intuition & Strategy**: High-level explanation of how the algorithm solves the problem.
2. **Key Data Structures & Concepts**: What patterns or data structures are used (e.g. Two Pointers, Hash Map, Binary Search).
3. **Step-by-Step Code Walkthrough**: Explain how the code works line-by-line or block-by-block.
4. **Time & Space Complexity**: Big-O analysis for time and memory usage with justification.
5. **Key Takeaways & Edge Cases**: Common pitfalls, edge cases handled, and optimization ideas if applicable.`;
        } else if (mode === 'line-by-line') {
          prompt = `Provide a detailed line-by-line breakdown of this ${language} code for LeetCode problem "${title}":

Problem Context:
${question}

Code:
\`\`\`${language}
${code}
\`\`\`

Format your response as line-by-line or logic block analysis with clear subheadings, line references, variable updates, and state tracking.`;
        } else if (mode === 'complexity') {
          prompt = `Provide a deep-dive Time and Space Complexity analysis for this solution to "${title}":

Code (${language}):
\`\`\`${language}
${code}
\`\`\`

Explain:
- **Time Complexity**: Exact Big-O notation, worst-case / average-case, breakdown per loop or operation.
- **Space Complexity**: Auxiliary memory allocated, stack recursion depth, hash table sizes.
- **Can it be optimized further?**: Lower bound complexity limits.`;
        } else if (mode === 'dry-run') {
          prompt = `Perform a step-by-step Dry Run execution trace on a representative sample test case for "${title}":

Code:
\`\`\`${language}
${code}
\`\`\`

Show:
1. Selected Input test case.
2. Step-by-step table or bullet list tracking loop variables, pointers, or data structure states at each step.
3. Final Output.`;
        } else if (mode === 'chat') {
          prompt = `You are a helpful coding tutor assisting with LeetCode problem "${title}".

Question Context:
${question}

Code:
\`\`\`${language}
${code}
\`\`\`

User Question: ${userQuery}

Answer concisely, accurately, and clearly using markdown formatted code snippets where helpful.`;
        }

        const result = await model.generateContent(prompt);
        const explanation = result.response.text();
        return res.json({ success: true, mode, explanation, isAiGenerated: true });
      } catch (geminiError) {
        console.warn('Gemini API call failed or key invalid, using smart fallback engine:', geminiError.message);
      }
    }

    // Smart Fallback Explanation Engine (works offline/without API key)
    const fallbackExplanation = generateFallbackExplanation({ title, question, code, language, mode, userQuery });
    return res.json({ success: true, mode, explanation: fallbackExplanation, isAiGenerated: false });

  } catch (error) {
    console.error('Error generating explanation:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fallback explanation generator
function generateFallbackExplanation({ title, question, code, language, mode, userQuery }) {
  if (mode === 'chat' && userQuery) {
    return `### Answer to: "${userQuery}"\n\nBased on your **${language}** implementation for **${title}**:\n\n- The code processes elements sequentially and checks constraints specified in the problem statement.\n- To modify or optimize this logic, consider how variables update on each iteration.\n\n*Tip: Connect a Gemini API key in Settings for instant, interactive AI responses tailored to any custom question!*`;
  }

  if (mode === 'line-by-line') {
    const lines = code.split('\n');
    let lineBreakdown = `### Line-by-Line Code Breakdown\n\n`;
    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      const trimmed = line.trim();
      if (trimmed) {
        lineBreakdown += `**Line ${lineNum}**: \`${trimmed}\`  \n> Executes execution step for local scope variable state.\n\n`;
      }
    });
    return lineBreakdown;
  }

  if (mode === 'complexity') {
    return `### Time & Space Complexity Analysis

#### Time Complexity: $O(N)$ to $O(N^2)$
- The code iterates through input dimensions. Depending on nested loop structures or recursive calls, operations execute proportional to input size $N$.

#### Space Complexity: $O(1)$ to $O(N)$
- Auxiliary memory depends on allocated hash maps, arrays, or recursion stack frames.

*For precise mathematical proofs and bounds, enable Gemini AI in Settings.*`;
  }

  if (mode === 'dry-run') {
    return `### Execution Trace & Dry Run

#### Initial State
- Input parameter initialized from problem specification.
- Local pointers and trackers instantiated.

#### Step Trace
1. Begin execution loop over input elements.
2. Evaluate conditional criteria.
3. Update state accumulator or return indices once target condition is met.

#### Output
- Returns computed result matching problem expectations.`;
  }

  // Default Overview
  return `### Solution Explanation for ${title}

#### 💡 Approach Overview
This solution implements a algorithmic solution in **${language.toUpperCase()}** designed to address the problem requirements cleanly.

#### ⚙️ How It Works
1. **Input Parsing & Initialization**: The function receives the input parameters and initializes key tracking variables.
2. **Main Algorithm Logic**: Iterates over data elements, evaluating rules and building the target result.
3. **Return Value**: Computes and returns the expected result adhering to problem constraints.

#### 📊 Quick Complexity
- **Time Complexity**: Evaluated based on loop depth and operations.
- **Space Complexity**: Evaluated based on memory usage.

---
*💡 Tip: Add your Google Gemini API Key in the top-right Settings modal for live deep-dive AI explanations, custom dry-runs, and interactive q&a!*`;
}

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`LeetExplainer Backend Server running on http://localhost:${port}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);

