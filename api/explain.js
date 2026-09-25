import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateFallbackExplanation } from './_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

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
        console.warn('Gemini API error, using fallback:', geminiError.message);
      }
    }

    const fallbackExplanation = generateFallbackExplanation({ title, question, code, language, mode, userQuery });
    return res.json({ success: true, mode, explanation: fallbackExplanation, isAiGenerated: false });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
