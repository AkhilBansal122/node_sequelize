const express = require('express');
const router = express.Router();

require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/admin/profile/';
    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    const filePath = file.fieldname + '-' + uniqueSuffix;
    cb(null, filePath); // File naming strategy
        
  }
});


// Multer file upload configuration
const upload = multer({ storage: storage });
const authController = require("../controller/auth/usersControllers");
const {authenticateToken} = require("../../middleware/authenticateToken");
router.post('/login',authController.login);
router.post('/profile',[authenticateToken],authController.profile);
router.post('/update-profile',[authenticateToken], upload.single('image'), authController.updateProfile);
router.post('/change-password',[authenticateToken,authController.changePassword]);
router.post('/logout',[authenticateToken],authController.logouts);
router.post('/forgot-password',authController.forgotPassword);
router.post('/verify-otp',authController.verifyOtp);
router.post('/reset-password', authController.resetPassword);
module.exports =router;