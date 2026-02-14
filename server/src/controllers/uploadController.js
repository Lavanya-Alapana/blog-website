const uploadService = require('../services/uploadService');

// Upload image
const uploadImage = async (req, res, next) => {
  try {
    const result = await uploadService.uploadImage(req.body.image);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Delete image
const deleteImage = async (req, res, next) => {
  try {
    const result = await uploadService.deleteImage(req.params.publicId);
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
  deleteImage
};
