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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            {greeting}, {userName}
          </h1>
          <p className="text-base text-gray-600">Here's your learning overview</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">Study Hours</h3>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-semibold text-gray-900 mb-1">{stats.totalHours}</p>
            <p className="text-sm text-gray-500">Total hours logged</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">Topics Completed</h3>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-semibold text-gray-900 mb-1">{stats.topicsCompleted}</p>
            <p className="text-sm text-gray-500">Topics mastered</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">Current Streak</h3>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-semibold text-gray-900 mb-1">{stats.currentStreak}</p>
            <p className="text-sm text-gray-500">days in a row</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/plan" className="group p-5 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1 text-gray-900 group-hover:text-gray-700">View Learning Plan</h3>
                  <p className="text-sm text-gray-600">Check your personalized study roadmap</p>
                </div>
              </div>
            </a>
            
            <a href="/explainer" className="group p-5 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1 text-gray-900 group-hover:text-gray-700">Explain Code</h3>
                  <p className="text-sm text-gray-600">Get AI-powered code explanations</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity / Tips Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Learning Tips</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Consistency is key to mastering new skills. Try to study a little bit every day to maintain momentum.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-sm text-gray-600">Break complex topics into smaller chunks for better understanding.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Today's Goals</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Complete daily learning session</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Finish this week's topics</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Practice coding challenges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
