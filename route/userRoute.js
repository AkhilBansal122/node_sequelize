const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require("../controllers/usersControllers");
const {authenticateToken} = require("../middleware/authenticateToken");

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/profile',[authenticateToken],userController.profile);
router.post('/update-profile',[authenticateToken,userController.updateProfile]);
router.post('/change-password',[authenticateToken,userController.changePassword]);
router.post('/logout',[authenticateToken],userController.logouts);
router.post('/forgot-password',userController.forgotPassword);
router.post('/verify-otp',userController.verifyOtp);

router.post('/reset-password', userController.resetPassword);

module.exports =router;