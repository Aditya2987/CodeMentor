import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-2xl font-bold text-primary">CodeMentor AI</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-primary">Dashboard</Link>
            <Link to="/plan" className="text-gray-700 hover:text-primary">Learning Plan</Link>
            <Link to="/explainer" className="text-gray-700 hover:text-primary">Code Explainer</Link>
          </div>
          <div className="flex items-center">
            <button onClick={handleLogout} className="text-gray-700 hover:text-primary">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
