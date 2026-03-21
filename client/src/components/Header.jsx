import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Menu, 
  User, 
  MessageSquare, 
  Activity, 
  Calendar, 
  Map as MapIcon 
} from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <Activity className="w-4 h-4" />, requiresAuth: true },
    { name: 'Chat Support', path: '/chat', icon: <MessageSquare className="w-4 h-4" />, requiresAuth: true },
    { name: 'Therapy', path: '/book', icon: <Calendar className="w-4 h-4" />, requiresAuth: true },
    { name: 'Community', path: '/community', icon: <MapIcon className="w-4 h-4" />, requiresAuth: true },
  ];

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <span className="font-bold text-xl text-indigo-600 tracking-tight">Mitra 2.0</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </>
            ) : null}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4 border-l pl-4 border-gray-200">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-100">
                  <User className="w-4 h-4 text-indigo-500" />
                  <span>{user?.name || user?.anonymousAlias || 'Student'}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition-all hover:shadow transform hover:-translate-y-0.5"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <div className="flex items-center gap-3 px-3 py-3 text-gray-700 font-medium">
                    <User className="w-5 h-5 text-indigo-500" />
                    <span>{user?.name || user?.anonymousAlias}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/login"
                  className="block text-center w-full px-4 py-3 text-base font-medium text-indigo-600 bg-indigo-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block text-center w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
