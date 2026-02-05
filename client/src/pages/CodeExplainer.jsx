import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

function CodeExplainer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [level, setLevel] = useState('beginner');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/ai/explain', 
        { code, language, level },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setExplanation(response.data.explanation);
    } catch (error) {
      setExplanation('Error: ' + (error.response?.data?.message || 'Failed to explain code'));
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

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Explanation</h2>
            <div className="prose max-w-none">
              {explanation ? (
                <div className="whitespace-pre-wrap text-gray-700">{explanation}</div>
              ) : (
                <p className="text-gray-400">Paste your code and click "Explain Code" to get started</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeExplainer;
