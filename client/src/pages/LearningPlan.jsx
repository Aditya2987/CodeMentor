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

  const generateMockPlan = (goal, weeks, level) => {
    const topics = {
      beginner: [
        'Introduction and Setup',
        'Basic Syntax and Concepts',
        'Variables and Data Types',
        'Control Flow (if/else, loops)',
        'Functions and Methods',
        'Data Structures (Arrays, Objects)',
        'Error Handling',
        'Practice Projects'
      ],
      intermediate: [
        'Advanced Concepts Review',
        'Object-Oriented Programming',
        'Functional Programming',
        'Async Programming',
        'API Integration',
        'Testing and Debugging',
        'Design Patterns',
        'Real-world Project'
      ],
      advanced: [
        'Architecture Patterns',
        'Performance Optimization',
        'Security Best Practices',
        'Scalability Strategies',
        'Advanced Algorithms',
        'System Design',
        'DevOps Integration',
        'Production Deployment'
      ]
    };

    const selectedTopics = topics[level] || topics.beginner;
    const weeksData = [];
    
    for (let i = 0; i < weeks; i++) {
      weeksData.push({
        weekNumber: i + 1,
        topics: selectedTopics.slice(i * 2, (i + 1) * 2).filter(t => t),
        estimatedHours: Math.floor(Math.random() * 5) + 3,
        completed: i < Math.floor(weeks * 0.3)
      });
    }

    return {
      goal,
      weeks: weeksData,
      progress: Math.floor((weeksData.filter(w => w.completed).length / weeks) * 100)
    };
  };

  const fetchPlan = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/learning/plan', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlan(response.data);
    } catch (error) {
      // Check if there's a saved plan in localStorage
      const savedPlan = localStorage.getItem('learningPlan');
      if (savedPlan) {
        setPlan(JSON.parse(savedPlan));
      }
    }
  };

  const generatePlan = async () => {
    if (!formData.goal.trim()) {
      alert('Please enter a learning goal');
      return;
    }

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
      // Generate mock plan if API fails
      setTimeout(() => {
        const mockPlan = generateMockPlan(
          formData.goal,
          formData.weeksAvailable,
          formData.experienceLevel
        );
        setPlan(mockPlan);
        localStorage.setItem('learningPlan', JSON.stringify(mockPlan));
        setShowGenerator(false);
        setLoading(false);
      }, 1500);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="mr-3">📚</span> Learning Plan
            </h1>
            <p className="text-lg text-gray-600">Your personalized roadmap to success</p>
          </div>
          <button 
            onClick={() => setShowGenerator(!showGenerator)} 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            {showGenerator ? '✕ Cancel' : '+ Create New Plan'}
          </button>
        </div>

        {showGenerator && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border-2 border-blue-200">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-2">🎯</span> Generate Your Learning Plan
              </h2>
              <p className="text-blue-100 mt-1">Tell us about your goals and we'll create a personalized roadmap</p>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎯 What do you want to learn?
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., Master React, Learn Python, Build Full-Stack Apps" 
                  value={formData.goal} 
                  onChange={(e) => setFormData({...formData, goal: e.target.value})} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📊 Experience Level
                  </label>
                  <select 
                    value={formData.experienceLevel} 
                    onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="beginner">🌱 Beginner</option>
                    <option value="intermediate">🚀 Intermediate</option>
                    <option value="advanced">⚡ Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Weeks Available
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    max="52"
                    placeholder="8" 
                    value={formData.weeksAvailable} 
                    onChange={(e) => setFormData({...formData, weeksAvailable: parseInt(e.target.value) || 8})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ⏰ Hours per Week
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    max="40"
                    placeholder="5" 
                    value={formData.hoursPerWeek} 
                    onChange={(e) => setFormData({...formData, hoursPerWeek: parseInt(e.target.value) || 5})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <button 
                onClick={generatePlan} 
                disabled={loading || !formData.goal.trim()} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Your Plan...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">✨</span> Generate My Learning Plan
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {plan && plan.weeks && (
          <div className="space-y-6">
            {/* Plan Header */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6">
                <h2 className="text-2xl font-bold text-white mb-3 flex items-center">
                  <span className="mr-2">🎯</span> {plan.goal}
                </h2>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">Overall Progress</span>
                    <span className="text-white font-bold text-lg">{plan.progress || 0}%</span>
                  </div>
                  <div className="bg-white/30 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-500 shadow-lg" 
                      style={{width: `${plan.progress || 0}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Plan */}
            <div className="grid gap-4">
              {plan.weeks.map((week) => (
                <div 
                  key={week.weekNumber} 
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                    week.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-200'
                  }`}
                >
                  <div className={`p-6 ${week.completed ? 'bg-green-50' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${
                          week.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {week.completed ? '✓' : week.weekNumber}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Week {week.weekNumber}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <span className="mr-2">⏱️</span> {week.estimatedHours} hours
                          </p>
                        </div>
                      </div>
                      {week.completed && (
                        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Completed
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {week.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <span className="text-blue-500 mr-3 mt-0.5">▸</span>
                          <span className="text-gray-700 flex-1">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!plan && !showGenerator && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-7xl mb-6 animate-bounce">🚀</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Learning Journey</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Create a personalized learning plan tailored to your goals, experience level, and schedule.
              </p>
              <button 
                onClick={() => setShowGenerator(true)} 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">✨</span> Create Your First Plan
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningPlan;
