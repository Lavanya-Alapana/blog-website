import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import blogService from '../services/blogService';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    status: 'published',
    search: '',
    category: '',
    sortBy: '-createdAt'
  });

  // Real-time search with debounce
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput, page: 1 }));
    }, 500); // 500ms delay for debouncing

    return () => clearTimeout(delaySearch);
  }, [searchInput]);

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAllBlogs(filters);
      setBlogs(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
              Explore the World
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-teal-50 mb-2">
              Discover inspiring travel stories from adventurers worldwide
            </p>
            <p className="text-sm sm:text-base md:text-lg text-teal-100">
              ✈️ Adventures • 🏔️ Destinations • 📸 Experiences
            </p>
          </div>
          
          {/* Enhanced Real-time Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              {/* Search Icon - Always Visible */}
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none z-10">
                <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-300 ${searchInput ? 'text-teal-600 scale-110' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Search Input */}
              <input
                type="text"
                placeholder="Type to search destinations, adventures, tips..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 sm:pl-14 md:pl-16 pr-12 sm:pr-14 md:pr-16 py-3 sm:py-4 md:py-5 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl text-slate-800 placeholder-slate-500 outline-none focus:ring-4 focus:ring-white/50 shadow-2xl text-sm sm:text-base md:text-lg font-medium transition-all hover:shadow-3xl border-2 border-transparent focus:border-white/60"
              />
              
              {/* Clear Button or Loading Indicator */}
              <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 md:pr-5 flex items-center">
                {loading && searchInput ? (
                  <div className="pointer-events-none">
                    <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : searchInput ? (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-slate-500 hover:text-slate-800 transition-colors hover:bg-slate-100 rounded-lg p-1"
                    title="Clear search"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : null}
              </div>
            </div>
            
            {/* Search Info */}
            {searchInput && (
              <div className="mt-3 sm:mt-4 text-center animate-fade-in">
                <p className="text-white/90 text-xs sm:text-sm flex items-center justify-center gap-2 flex-wrap">
                  <span>Searching for:</span>
                  <span className="font-semibold bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/30">
                    {searchInput}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            {filters.search ? (
              <>
                <svg className="w-24 h-24 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">No stories found for "{filters.search}"</h3>
                <p className="text-slate-500 mb-6">Try different keywords or browse all travel stories</p>
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md"
                >
                  Clear Search & View All
                </button>
              </>
            ) : (
              <>
                <svg className="w-24 h-24 mx-auto text-teal-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">No travel stories found</h3>
                <p className="text-slate-500">Be the first to share your adventure!</p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blogs/${blog._id}`}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Featured Image with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center">
                        <svg className="w-20 h-20 text-white opacity-70" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-xs font-bold text-teal-700 rounded-full shadow-xl border border-white/50">
                        {blog.category || 'Travel'}
                      </span>
                    </div>
                    
                    {/* Like Count Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-white/50">
                        <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-bold text-slate-700">{blog.likeCount || 0}</span>
                      </div>
                    </div>

                    {/* Author Info Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/50">
                        {blog.author?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-semibold text-sm drop-shadow-lg">{blog.author?.name}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {blog.content.substring(0, 120)}...
                    </p>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 text-xs rounded-full font-semibold border border-teal-100"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Read More Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                  disabled={filters.page === 1}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50 hover:border-teal-500 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setFilters({ ...filters, page: index + 1 })}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        filters.page === index + 1
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                          : 'border-2 border-slate-300 hover:bg-teal-50 hover:border-teal-500'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                  disabled={filters.page === pagination.totalPages}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50 hover:border-teal-500 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
