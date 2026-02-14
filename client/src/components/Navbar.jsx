import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/blogs');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/blogs" className="flex items-center gap-2 group flex-shrink-0">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-teal-500 group-hover:text-teal-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              WanderTales
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              to="/blogs"
              className="text-slate-700 hover:text-teal-600 font-semibold transition-colors"
            >
              Explore
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-blogs"
                  className="text-slate-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  My Adventures
                </Link>
                <Link
                  to="/blogs/create"
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
                >
                  Share Story
                </Link>
                
                {/* User Menu */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-slate-700 hover:text-red-600 font-semibold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
                >
                  Join Us
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                to="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-slate-700 hover:bg-teal-50 hover:text-teal-600 font-semibold rounded-lg transition-colors"
              >
                Explore
              </Link>

              {user ? (
                <>
                  <Link
                    to="/my-blogs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-slate-700 hover:bg-teal-50 hover:text-teal-600 font-semibold rounded-lg transition-colors"
                  >
                    My Adventures
                  </Link>
                  <Link
                    to="/blogs/create"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md text-center"
                  >
                    Share Story
                  </Link>
                  
                  {/* User Info */}
                  <div className="px-4 py-3 bg-slate-50 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-slate-700">{user.name}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-slate-700 hover:bg-teal-50 hover:text-teal-600 font-semibold rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md text-center"
                  >
                    Join Us
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
