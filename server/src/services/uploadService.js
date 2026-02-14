const cloudinary = require('../config/cloudinary');
const { BadRequestError } = require('../utils/customErrors');

class UploadService {
  // Upload image to Cloudinary
  async uploadImage(imageData) {
    if (!imageData) {
      throw new BadRequestError('No image data provided');
    }

    try {
      const result = await cloudinary.uploader.upload(imageData, {
        folder: 'blog-images',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [
          { width: 1200, height: 630, crop: 'limit' },
          { quality: 'auto' }
        ]
      });

      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to upload image');
    }
  }

  // Delete image from Cloudinary
  async deleteImage(publicId) {
    if (!publicId) {
      throw new BadRequestError('Public ID is required');
    }

    try {
      // Replace -- with / to restore the original public_id format
      const formattedPublicId = publicId.replace(/--/g, '/');
      
      await cloudinary.uploader.destroy(formattedPublicId);

      return { message: 'Image deleted successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete image');
    }
  }
}

module.exports = new UploadService();
