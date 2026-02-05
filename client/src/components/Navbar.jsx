import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/plan', label: 'Learning Plan', icon: '📚' },
    { path: '/explainer', label: 'Code Explainer', icon: '💡' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all">
              <span className="text-3xl">🎓</span>
              <span>CodeMentor AI</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-gray-700 hover:text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-all"
            >
              <span className="mr-2">🚪</span>
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-gray-700 hover:text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-all"
            >
              <span className="mr-2">🚪</span>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
