import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-[#1e40af]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] bg-clip-text text-transparent">BlogHub</h2>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white rounded-lg font-semibold text-sm hover:from-[#1e40af] hover:to-[#1d4ed8] transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-md p-10 border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 text-lg mt-1">{user?.email}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 min-w-[100px]">User ID:</span>
                <span className="text-gray-900 font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                  {user?._id}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 min-w-[100px]">Status:</span>
                <span className="text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">Ready to start writing?</h3>
            <p className="text-gray-700 mb-4">Share your thoughts and stories with the world.</p>
            <button className="px-6 py-2 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white rounded-lg font-semibold hover:from-[#1e40af] hover:to-[#1d4ed8] transition-all shadow-md">
              Create New Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
