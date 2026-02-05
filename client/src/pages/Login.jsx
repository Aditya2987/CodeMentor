import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { handleApiError, validateInput, isOnline } from '../utils/errorHandler';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const validation = validateInput(
      { email, password },
      {
        email: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address'
        },
        password: {
          required: true,
          minLength: 6
        }
      }
    );

    setFieldErrors(validation.errors);
    return validation.isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Check network connectivity
    if (!isOnline()) {
      setError('No internet connection. Please check your network and try again.');
      return;
    }

    // Validate form
    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }

    setLoading(true);

    try {
      // Demo mode - works without backend
      if (email && password) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockToken = 'demo-token-' + Date.now();
        const mockUser = { email, name: email.split('@')[0] };
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setIsAuthenticated(true);
        navigate('/dashboard');
        return;
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }

    // Real API call (if backend is available)
    try {
      const response = await axios.post('/api/auth/login', { email, password }, {
        timeout: 10000 // 10 second timeout
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      // Fallback to demo mode if API fails
      const mockToken = 'demo-token-' + Date.now();
      const mockUser = { email, name: email.split('@')[0] };
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Sign in to continue your learning journey</p>
          <div className="mt-3 inline-block bg-gray-100 border border-gray-200 rounded-lg px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Demo Mode - Use any credentials</p>
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
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors(prev => ({ ...prev, email: '' }));
              }}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
              }`}
              required 
              disabled={loading}
            />
            {fieldErrors.email && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span> {fieldErrors.email}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors(prev => ({ ...prev, password: '' }));
              }}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.password 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
              }`}
              required 
              disabled={loading}
            />
            {fieldErrors.password && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span> {fieldErrors.password}
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-gray-900 hover:text-gray-700 font-medium hover:underline">
              Create one now
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
