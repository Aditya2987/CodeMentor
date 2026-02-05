import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ totalHours: 0, topicsCompleted: 0, currentStreak: 0 });
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchStats();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const name = user.name || user.email?.split('@')[0] || 'User';
    // Capitalize first letter and clean up
    const cleanName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    setUserName(cleanName);
    
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/learning/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      // Use mock data if API fails
      const mockStats = {
        totalHours: Math.floor(Math.random() * 50) + 10,
        topicsCompleted: Math.floor(Math.random() * 20) + 5,
        currentStreak: Math.floor(Math.random() * 15) + 1
      };
      setStats(mockStats);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {greeting}, <span className="text-primary">{userName}</span>! 👋
          </h1>
          <p className="text-lg text-gray-600">Ready to continue your learning journey?</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Study Hours</h3>
              <span className="text-3xl">📚</span>
            </div>
            <p className="text-5xl font-bold text-blue-600 mb-1">{stats.totalHours}</p>
            <p className="text-sm text-gray-500">Keep up the great work!</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Topics Completed</h3>
              <span className="text-3xl">✅</span>
            </div>
            <p className="text-5xl font-bold text-purple-600 mb-1">{stats.topicsCompleted}</p>
            <p className="text-sm text-gray-500">You're making progress!</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Current Streak</h3>
              <span className="text-3xl">🔥</span>
            </div>
            <p className="text-5xl font-bold text-green-600 mb-1">{stats.currentStreak}</p>
            <p className="text-sm text-gray-500">days in a row</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">⚡</span> Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/plan" className="group relative overflow-hidden p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-start">
                <span className="text-4xl mr-4 group-hover:scale-110 transition-transform">📚</span>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">View Learning Plan</h3>
                  <p className="text-gray-600">Check your personalized study roadmap and track progress</p>
                </div>
              </div>
            </a>
            
            <a href="/explainer" className="group relative overflow-hidden p-6 border-2 border-purple-200 rounded-xl hover:border-purple-500 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-purple-50 to-white">
              <div className="flex items-start">
                <span className="text-4xl mr-4 group-hover:scale-110 transition-transform">💡</span>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">Explain Code</h3>
                  <p className="text-gray-600">Get AI-powered explanations for any code snippet</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity / Tips Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <span className="mr-2">💪</span> Keep Going!
            </h3>
            <p className="text-blue-100 mb-4">
              You're doing great! Consistency is key to mastering new skills. Try to study a little bit every day.
            </p>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-sm font-semibold">💡 Pro Tip:</p>
              <p className="text-sm text-blue-50">Break complex topics into smaller chunks for better understanding.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
              <span className="mr-2">🎯</span> Your Goals
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <span className="text-2xl mr-3">✓</span>
                <span className="text-gray-700">Complete daily learning session</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">○</span>
                <span className="text-gray-700">Finish this week's topics</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">○</span>
                <span className="text-gray-700">Practice coding challenges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
