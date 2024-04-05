const express = require('express');
const router = express.Router();
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

const storages = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/admin/profile/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadImg = multer({ storage: storages }).single('image');


const {loginSchema,updateProfileSchema,changePasswordSchema,forgotPasswordSchema,resetPasswordSchema,verifyOtpSchema} = require("../../validation/user.validator");

// Multer file upload configuration
const upload = multer({ storage: storages });
const authController = require("../controller/auth/usersControllers");
const {authenticateToken} = require("../../middleware/authenticateToken");


router.post('/login',[loginSchema],authController.login);
router.post('/profile',[authenticateToken],authController.profile);
router.post('/update-profile',[authenticateToken],updateProfileSchema, upload.single('image'), authController.updateProfile);

router.post('/change-password',[authenticateToken,changePasswordSchema,authController.changePassword]);
router.post('/logout',[authenticateToken],authController.logouts);
router.post('/forgot-password',[forgotPasswordSchema],authController.forgotPassword);
router.post('/verify-otp',[verifyOtpSchema],authController.verifyOtp);
router.post('/reset-password',[resetPasswordSchema], authController.resetPassword);
module.exports =router;