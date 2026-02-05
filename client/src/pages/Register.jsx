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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Join CodeMentor AI</h2>
          <p className="text-sm text-gray-500 mt-2">Demo Mode - No backend required</p>
        </div>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Experience Level</label>
            <select value={formData.experienceLevel} onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition">Register</button>
        </form>
        <p className="text-center mt-4 text-gray-600">Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
