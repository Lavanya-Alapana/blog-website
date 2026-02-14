const Blog = require('../models/Blog');
const mongoose = require('mongoose');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../utils/customErrors');

class BlogService {
  // Create new blog post
  async createBlog(blogData, authorId) {
    try {
      const blog = await Blog.create({
        ...blogData,
        author: authorId
      });
      
      return await blog.populate('author', 'name email');
    } catch (error) {
      // Handle MongoDB duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new BadRequestError(`A blog with this ${field} already exists. Please use a different ${field}.`);
      }
      throw error;
    }
  }

  // Get all blogs with pagination and filters
  async getAllBlogs(query) {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      tags,
      author,
      search,
      sortBy = '-createdAt'
    } = query;

    const filter = {};
    
    // Apply filters
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (author) filter.author = author;
    
    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate('author', 'name email')
        .sort(sortBy)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Blog.countDocuments(filter)
    ]);

    // Add likeCount to each blog
    const blogsWithLikeCount = blogs.map(blog => ({
      ...blog,
      likeCount: blog.likes ? blog.likes.length : 0
    }));

    return {
      blogs: blogsWithLikeCount,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        limit: parseInt(limit)
      }
    };
  }

  // Get single blog by ID
  async getBlogById(identifier) {
    const blog = await Blog.findById(identifier)
      .populate('author', 'name email')
      .lean();

    if (!blog) {
      throw new NotFoundError('Blog post not found');
    }

    // Convert likes array to strings for easier comparison in frontend
    blog.likes = blog.likes.map(id => id.toString());
    blog.likeCount = blog.likes.length;

    return blog;
  }

  // Update blog
  async updateBlog(blogId, updateData, userId) {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new NotFoundError('Blog post not found');
    }

    // Check if user is the author
    if (blog.author.toString() !== userId.toString()) {
      throw new UnauthorizedError('You are not authorized to update this blog');
    }

    Object.assign(blog, updateData);
    await blog.save();

    return await blog.populate('author', 'name email');
  }

  // Delete blog
  async deleteBlog(blogId, userId) {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new NotFoundError('Blog post not found');
    }

    // Check if user is the author
    if (blog.author.toString() !== userId.toString()) {
      throw new UnauthorizedError('You are not authorized to delete this blog');
    }

    await blog.deleteOne();
    return { message: 'Blog deleted successfully' };
  }

  // Get user's blogs
  async getUserBlogs(userId, query) {
    const { page = 1, limit = 10, status } = query;
    const filter = { author: userId };
    
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort('-createdAt')
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Blog.countDocuments(filter)
    ]);

    // Add likeCount to each blog
    const blogsWithLikeCount = blogs.map(blog => ({
      ...blog,
      likeCount: blog.likes ? blog.likes.length : 0
    }));

    return {
      blogs: blogsWithLikeCount,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        limit: parseInt(limit)
      }
    };
  }

  // Toggle like
  async toggleLike(blogId, userId) {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new NotFoundError('Blog post not found');
    }

    // Convert userId to string for comparison
    const userIdStr = userId.toString();
    const likeIndex = blog.likes.findIndex(id => id.toString() === userIdStr);

    if (likeIndex > -1) {
      // User already liked, remove the like
      blog.likes.splice(likeIndex, 1);
    } else {
      // User hasn't liked, add the like
      blog.likes.push(userId);
    }

    await blog.save();
    return { 
      liked: likeIndex === -1, 
      likeCount: blog.likes.length,
      likes: blog.likes.map(id => id.toString()) // Return array of user IDs as strings
    };
  }

  // Get blog statistics
  async getBlogStats(userId) {
    const stats = await Blog.aggregate([
      { $match: { author: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalLikes: { $sum: { $size: '$likes' } }
        }
      }
    ]);

    return stats;
  }
}

module.exports = new BlogService();
