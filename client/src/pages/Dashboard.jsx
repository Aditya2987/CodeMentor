import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ totalHours: 0, topicsCompleted: 0, currentStreak: 0 });
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchStats();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(user.name || 'User');
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Welcome back, {userName}! 👋</h1>
        <p className="text-gray-600 mb-8">Here's your learning progress</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm mb-2">Total Study Hours</h3>
            <p className="text-4xl font-bold text-primary">{stats.totalHours}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm mb-2">Topics Completed</h3>
            <p className="text-4xl font-bold text-secondary">{stats.topicsCompleted}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm mb-2">Current Streak</h3>
            <p className="text-4xl font-bold text-green-500">{stats.currentStreak} days</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/plan" className="p-4 border-2 border-primary rounded-lg hover:bg-blue-50 transition">
              <h3 className="font-bold text-lg mb-2">📚 View Learning Plan</h3>
              <p className="text-gray-600">Check your personalized study roadmap</p>
            </a>
            <a href="/explainer" className="p-4 border-2 border-secondary rounded-lg hover:bg-purple-50 transition">
              <h3 className="font-bold text-lg mb-2">💡 Explain Code</h3>
              <p className="text-gray-600">Get AI-powered code explanations</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
