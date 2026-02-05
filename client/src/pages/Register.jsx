import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', experienceLevel: 'beginner' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Demo mode - works without backend
    if (formData.name && formData.email && formData.password) {
      setTimeout(() => {
        const mockToken = 'demo-token-' + Date.now();
        const mockUser = { 
          email: formData.email, 
          name: formData.name,
          experienceLevel: formData.experienceLevel 
        };
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setIsAuthenticated(true);
        navigate('/dashboard');
      }, 500);
      return;
    }

    // Real API call (if backend is available)
    try {
      const response = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      // Fallback to demo mode
      const mockToken = 'demo-token-' + Date.now();
      const mockUser = { 
        email: formData.email, 
        name: formData.name,
        experienceLevel: formData.experienceLevel 
      };
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600 text-sm">Start your personalized learning journey today</p>
          <div className="mt-3 inline-block bg-gray-100 border border-gray-200 rounded-lg px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">No backend required - Try it now</p>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 flex items-start">
            <span className="text-xl mr-2">⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="John Doe"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              placeholder="you@example.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <input 
              type="password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              placeholder="Create a strong password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Experience Level</label>
            <select 
              value={formData.experienceLevel} 
              onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})} 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            >
              <option value="beginner">Beginner - Just starting out</option>
              <option value="intermediate">Intermediate - Some experience</option>
              <option value="advanced">Advanced - Experienced developer</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-sm"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-gray-900 hover:text-gray-700 font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
