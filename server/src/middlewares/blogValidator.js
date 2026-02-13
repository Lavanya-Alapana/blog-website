const { body, query, param, validationResult } = require('express-validator');

const validateCreateBlog = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  
  body('excerpt')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('Excerpt cannot exceed 500 characters'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published']).withMessage('Invalid status'),
  
  body('category')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters'),
  
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 }).withMessage('Each tag cannot exceed 30 characters'),
  
  body('featuredImage')
    .optional({ checkFalsy: true })
    .trim()
];

const validateUpdateBlog = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  
  body('excerpt')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('Excerpt cannot exceed 500 characters'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published']).withMessage('Invalid status'),
  
  body('category')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters'),
  
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  
  body('featuredImage')
    .optional({ checkFalsy: true })
    .trim()
];

const validateGetBlogs = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  query('status')
    .optional()
    .isIn(['draft', 'published']).withMessage('Invalid status'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', '-createdAt', 'views', '-views', 'title', '-title'])
    .withMessage('Invalid sort field')
];

const validateBlogId = [
  param('id')
    .notEmpty().withMessage('Blog ID is required')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

module.exports = {
  validateCreateBlog,
  validateUpdateBlog,
  validateGetBlogs,
  validateBlogId,
  validate
};
