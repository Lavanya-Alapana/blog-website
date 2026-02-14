import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await login(formData);
      toast.success('Login successful! Welcome back!');
      navigate('/my-blogs');
    } catch (error) {
      console.log('Full error object:', error);
      console.log('Error response:', error.response);
      console.log('Error response data:', error.response?.data);
      
      // Handle backend validation errors (express-validator format)
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.path || err.param] = err.msg;
        });
        setErrors(backendErrors);
        toast.error('Please fix the validation errors');
      } 
      // Handle single error message from backend
      else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      // Handle error without response (network error)
      else if (error.message) {
        toast.error(error.message);
      }
      // Fallback error
      else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">WanderTales</h2>
            <p className="text-slate-600 mt-1">Share your travel adventures with the world</p>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back, Traveler</h1>
          <p className="text-slate-600 mb-8">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                placeholder="you@example.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                  errors.password 
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                placeholder="Enter your password"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold text-base transition-all hover:shadow-lg hover:from-teal-600 hover:to-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline">
              Join the adventure
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Geometric Pattern */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 items-center justify-center p-12 relative overflow-hidden">
        {/* Animated Circles Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-lg text-white relative z-10">
          <div className="mb-8">
            <div className="w-20 h-20 mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4">Continue Your Journey</h2>
            <p className="text-teal-50 text-lg leading-relaxed">
              Welcome back! Your travel stories inspire thousands of adventurers around the world.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg">Share Adventures</h3>
                <p className="text-teal-50 text-sm">Continue inspiring fellow travelers</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg">Global Community</h3>
                <p className="text-teal-50 text-sm">Connect with travelers worldwide</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg">Track Impact</h3>
                <p className="text-teal-50 text-sm">See how your stories inspire others</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
