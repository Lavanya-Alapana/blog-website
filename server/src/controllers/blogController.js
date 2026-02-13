const blogService = require('../services/blogService');

// Create blog
const createBlog = async (req, res, next) => {
  try {
    const blog = await blogService.createBlog(req.body, req.user._id);
    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// Get all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const result = await blogService.getAllBlogs(req.query);
    res.json({
      success: true,
      data: result.blogs,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

// Get single blog
const getBlog = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// Update blog
const updateBlog = async (req, res, next) => {
  try {
    const blog = await blogService.updateBlog(
      req.params.id,
      req.body,
      req.user._id
    );
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog
const deleteBlog = async (req, res, next) => {
  try {
    const result = await blogService.deleteBlog(req.params.id, req.user._id);
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

// Get user's blogs
const getMyBlogs = async (req, res, next) => {
  try {
    const result = await blogService.getUserBlogs(req.user._id, req.query);
    res.json({
      success: true,
      data: result.blogs,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

// Toggle like
const toggleLike = async (req, res, next) => {
  try {
    const result = await blogService.toggleLike(req.params.id, req.user._id);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Get blog statistics
const getBlogStats = async (req, res, next) => {
  try {
    const stats = await blogService.getBlogStats(req.user._id);
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  toggleLike,
  getBlogStats
};
