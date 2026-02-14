import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';
import blogService from '../services/blogService';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogService.getBlog(id);
      setBlog(response.data);
      
      // Check if current user has liked this blog
      if (user && response.data.likes && Array.isArray(response.data.likes)) {
        setIsLiked(response.data.likes.includes(user._id));
      }
    } catch (error) {
      toast.error('Failed to load blog');
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like this blog');
      return;
    }

    try {
      const response = await blogService.toggleLike(id);
      setIsLiked(response.data.liked);
      setBlog(prev => ({ 
        ...prev, 
        likeCount: response.data.likeCount,
        likes: response.data.likes 
      }));
      toast.success(response.data.liked ? 'Blog liked!' : 'Blog unliked');
    } catch (error) {
      toast.error('Failed to like blog');
    }
  };

  const openDeleteModal = () => {
    setDeleteModal({ isOpen: true });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false });
  };

  const handleDelete = async () => {
    try {
      await blogService.deleteBlog(id);
      toast.success('Blog deleted successfully');
      navigate('/my-blogs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const isAuthor = user && blog.author._id === user._id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      {blog.featuredImage && (
        <div className="h-96 relative">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12 -mt-32 relative z-10">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-sm font-semibold rounded-full">
              {blog.category || 'Travel'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {blog.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{blog.author.name}</p>
                <p className="text-sm text-slate-500">
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-slate-600">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-colors ${
                  isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {blog.likeCount || 0}
              </button>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
              {blog.content}
            </p>
          </div>

          {/* Author Actions */}
          {isAuthor && (
            <div className="flex gap-4 pt-8 border-t border-slate-200">
              <Link
                to={`/blogs/${blog._id}/edit`}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md"
              >
                Edit Story
              </Link>
              <button
                onClick={openDeleteModal}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
              >
                Delete Story
              </button>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Stories
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${blog?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default BlogDetail;
