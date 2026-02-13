import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/blogs');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/blogs" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] bg-clip-text text-transparent">
              BlogHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/blogs"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Explore
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-blogs"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  My Blogs
                </Link>
                <Link
                  to="/blogs/create"
                  className="px-4 py-2 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white rounded-lg font-semibold hover:from-[#1e40af] hover:to-[#1d4ed8] transition-all"
                >
                  Create Blog
                </Link>
                
                {/* User Menu */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 font-semibold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white rounded-lg font-semibold hover:from-[#1e40af] hover:to-[#1d4ed8] transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
