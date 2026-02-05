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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 flex items-center">
            <span className="mr-3">💡</span> Code Explainer
          </h1>
          <p className="text-lg text-gray-600">Get intelligent explanations for any code snippet</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">📝</span> Your Code
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="typescript">TypeScript</option>
                    <option value="go">Go</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Level</label>
                  <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors">
                    <option value="beginner">🌱 Beginner</option>
                    <option value="intermediate">🚀 Intermediate</option>
                    <option value="advanced">⚡ Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
                <Editor
                  height="400px"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{ 
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                  }}
                />
              </div>
              
              <button 
                onClick={handleExplain} 
                disabled={loading || !code.trim()} 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">✨</span> Explain Code
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">📖</span> Explanation
              </h2>
            </div>
            <div className="p-6 overflow-y-auto" style={{maxHeight: '550px'}}>
              {explanation ? (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{explanation}</div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="text-7xl mb-4 animate-bounce">💡</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Ready to Learn?</h3>
                  <p className="text-gray-500 mb-4 max-w-md">
                    Paste your code in the editor, select your language and skill level, then click "Explain Code"
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-sm text-blue-700 font-semibold">
                      ✨ Works in demo mode without backend!
                    </p>
                  </div>
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
