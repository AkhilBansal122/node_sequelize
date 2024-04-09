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
const brandController = require("../controller");
const { authenticateToken } = require("../../../middleware/authenticateToken");
const { addbrandSchemas, editbrandSchema, updatebrandSchema, listbrandSchema, statusBrandSchema } = require('../schema/index');
router.post('/listing-brand', [authenticateToken,listbrandSchema], brandController.listingBrand);
router.post('/create-brand',upload.single('image'),addbrandSchemas,  brandController.addNewBrand);
router.post('/edit-brand', [authenticateToken, editbrandSchema], brandController.editBrand);
router.post('/update-brand', [authenticateToken, updatebrandSchema], upload.single('image'), brandController.updateBrand);
router.post('/status-brand', [authenticateToken, statusBrandSchema], brandController.statusBrand);
module.exports = router;