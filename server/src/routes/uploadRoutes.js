const express = require('express');
const { uploadImage, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Upload single image to Cloudinary
router.post('/image', protect, uploadImage);

// Delete image from Cloudinary
router.delete('/image/:publicId', protect, deleteImage);

module.exports = router;
