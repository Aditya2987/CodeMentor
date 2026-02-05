import { useState, useEffect } from 'react';
import axios from 'axios';

function LearningPlan() {
  const [plan, setPlan] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [formData, setFormData] = useState({ goal: '', experienceLevel: 'beginner', weeksAvailable: 8, hoursPerWeek: 5 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/learning/plan', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlan(response.data);
    } catch (error) {
      console.error('Error fetching plan:', error);
    }
  };

  const generatePlan = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const aiResponse = await axios.post('/api/ai/generate-plan', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      await axios.post('/api/learning/plan', {
        goal: formData.goal,
        weeks: aiResponse.data.weeks
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchPlan();
      setShowGenerator(false);
    } catch (error) {
      console.error('Error generating plan:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Learning Plan</h1>
          <button onClick={() => setShowGenerator(!showGenerator)} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            {showGenerator ? 'Cancel' : 'Create New Plan'}
          </button>
        </div>

        {showGenerator && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Generate Learning Plan</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Learning goal (e.g., Master React)" value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <select value={formData.experienceLevel} onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})} className="w-full px-4 py-2 border rounded">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <input type="number" placeholder="Weeks available" value={formData.weeksAvailable} onChange={(e) => setFormData({...formData, weeksAvailable: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded" />
              <input type="number" placeholder="Hours per week" value={formData.hoursPerWeek} onChange={(e) => setFormData({...formData, hoursPerWeek: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded" />
              <button onClick={generatePlan} disabled={loading} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
                {loading ? 'Generating...' : 'Generate Plan'}
              </button>
            </div>
          </div>
        )}

        {plan && plan.weeks && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <h2 className="text-xl font-bold">Goal: {plan.goal}</h2>
              <div className="mt-2 bg-gray-200 rounded-full h-4">
                <div className="bg-primary h-4 rounded-full" style={{width: `${plan.progress || 0}%`}}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{plan.progress || 0}% Complete</p>
            </div>

            {plan.weeks.map((week) => (
              <div key={week.weekNumber} className={`bg-white p-6 rounded-lg shadow ${week.completed ? 'border-l-4 border-green-500' : ''}`}>
                <h3 className="text-xl font-bold mb-2">Week {week.weekNumber}</h3>
                <p className="text-gray-600 mb-2">{week.estimatedHours} hours</p>
                <ul className="list-disc list-inside space-y-1">
                  {week.topics.map((topic, idx) => (
                    <li key={idx} className="text-gray-700">{topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!plan && !showGenerator && (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">No learning plan yet</p>
            <button onClick={() => setShowGenerator(true)} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Create Your First Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningPlan;
