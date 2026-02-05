import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

function CodeExplainer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [level, setLevel] = useState('beginner');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMockExplanation = (code, language, level) => {
    const explanations = {
      beginner: `🎯 **Simple Explanation:**

This ${language} code does the following:

1. **Purpose**: The code performs a specific task or operation
2. **How it works**: It processes data step by step
3. **Key concepts**: Variables, functions, and logic flow

**Line-by-line breakdown:**
- The code starts by setting up necessary variables
- Then it performs the main operation
- Finally, it returns or displays the result

💡 **Tip**: Try modifying the values to see how the output changes!`,
      
      intermediate: `📚 **Detailed Explanation:**

This ${language} code demonstrates several programming concepts:

**Structure & Flow:**
- Uses proper syntax and conventions for ${language}
- Implements logic through conditional statements or loops
- Manages data efficiently

**Key Components:**
1. Variable declarations and initialization
2. Function definitions (if present)
3. Control flow (loops, conditionals)
4. Data manipulation

**Best Practices:**
- Code follows ${language} conventions
- Readable and maintainable structure
- Efficient algorithm implementation

🔍 **Deep Dive**: Consider edge cases and error handling for production use.`,
      
      advanced: `🚀 **Advanced Analysis:**

**Algorithmic Complexity:**
- Time Complexity: O(n) or better depending on operations
- Space Complexity: Optimized for memory usage

**Design Patterns & Architecture:**
- Follows ${language} idioms and best practices
- Implements efficient data structures
- Considers scalability and performance

**Technical Details:**
1. Memory management and optimization
2. Potential bottlenecks and solutions
3. Thread safety (if applicable)
4. Error handling strategies

**Optimization Opportunities:**
- Consider caching for repeated operations
- Evaluate alternative algorithms
- Profile for performance bottlenecks

⚡ **Pro Tip**: Benchmark different approaches for your specific use case.`
    };
    
    return explanations[level] || explanations.beginner;
  };

  const handleExplain = async () => {
    if (!code.trim()) {
      setExplanation('⚠️ Please enter some code to explain!');
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/ai/explain', 
        { code, language, level },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setExplanation(response.data.explanation);
    } catch (error) {
      // Use mock explanation if API fails
      setTimeout(() => {
        const mockExplanation = generateMockExplanation(code, language, level);
        setExplanation(mockExplanation + '\n\n---\n*Demo Mode: Using AI-simulated explanation*');
        setLoading(false);
      }, 1000);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Code Explainer</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex gap-4 mb-4">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-4 py-2 border rounded">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="px-4 py-2 border rounded">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <Editor
              height="400px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{ minimap: { enabled: false } }}
            />
            
            <button onClick={handleExplain} disabled={loading} className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400">
              {loading ? 'Explaining...' : 'Explain Code'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow overflow-y-auto" style={{maxHeight: '500px'}}>
            <h2 className="text-2xl font-bold mb-4">Explanation</h2>
            <div className="prose max-w-none">
              {explanation ? (
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{explanation}</div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💡</div>
                  <p className="text-gray-400">Paste your code and click "Explain Code" to get started</p>
                  <p className="text-sm text-gray-400 mt-2">Works in demo mode without backend!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeExplainer;
