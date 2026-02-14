import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setLoading(false);
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      toast.success('Account created successfully! Welcome to BlogHub!');
      navigate('/my-blogs');
    } catch (error) {
      console.log('Register error:', error.response?.data); // Debug log
      
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
      // Handle network or other errors
      else {
        toast.error('Registration failed. Please try again.');
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
         
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Start Your Adventure</h1>
          <p className="text-slate-600 mb-8">Join our community of travel storytellers</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                  errors.name 
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                placeholder="John Doe"
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>

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
                placeholder="Create a password (min. 6 characters)"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                  errors.confirmPassword 
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                placeholder="Confirm your password"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
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
                  Creating account...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Grid Pattern */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 items-center justify-center p-12 relative overflow-hidden">
        {/* Diagonal Lines Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating Squares */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white transform rotate-45"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-white transform rotate-12"></div>
          <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white transform -rotate-12"></div>
        </div>
        
        <div className="max-w-lg text-white relative z-10">
          <div className="mb-8">
            <div className="w-20 h-20 mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4">Begin Your Travel Journey</h2>
            <p className="text-teal-50 text-lg leading-relaxed">
              Join thousands of travelers sharing their adventures, tips, and unforgettable experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base mb-1">Share Stories</h3>
              <p className="text-teal-50 text-xs">Document your adventures</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base mb-1">Connect</h3>
              <p className="text-teal-50 text-xs">Meet fellow travelers</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base mb-1">Discover</h3>
              <p className="text-teal-50 text-xs">Explore destinations</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-base mb-1">Inspire</h3>
              <p className="text-teal-50 text-xs">Help others explore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
