const express = require('express');
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  toggleLike,
  getBlogStats
} = require('../controllers/blogController');
const {
  validateCreateBlog,
  validateUpdateBlog,
  validateGetBlogs,
  validateBlogId,
  validate
} = require('../middlewares/blogValidator');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', validateGetBlogs, validate, getAllBlogs);
router.get('/:id', validateBlogId, validate, getBlog);

// Protected routes (require authentication)
router.use(protect);

router.post('/', validateCreateBlog, validate, createBlog);
router.get('/user/my-blogs', getMyBlogs);
router.get('/user/stats', getBlogStats);
router.put('/:id', validateBlogId, validateUpdateBlog, validate, updateBlog);
router.delete('/:id', validateBlogId, validate, deleteBlog);
router.post('/:id/like', validateBlogId, validate, toggleLike);

module.exports = router;
