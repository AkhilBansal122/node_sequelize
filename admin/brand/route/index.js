const express = require('express');
const router = express.Router();

require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/admin/brand/';
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
const authController = require("../../brand/controller");
const { authenticateToken } = require("../../../middleware/authenticateToken");

router.post('/create-brand', [authenticateToken], upload.single('image'), authController.addNewBrand);
router.post('/edit-brand', [authenticateToken], authController.editBrand);
router.post('/update-brand', [authenticateToken], upload.single('image'), authController.updateBrand);
router.post('/listing-brand', [authenticateToken], authController.listingBrand);
router.post('/status-brand', [authenticateToken], authController.statusBrand);

module.exports = router;