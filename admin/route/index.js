const express = require('express');
const router = express.Router();
require('dotenv').config();

const authController = require("../controller/auth/usersControllers");
const {authenticateToken} = require("../../middleware/authenticateToken");

router.post('/login',authController.login);
router.post('/profile',[authenticateToken],authController.profile);
router.post('/update-profile',[authenticateToken,authController.updateProfile]);
router.post('/change-password',[authenticateToken,authController.changePassword]);
router.post('/logout',[authenticateToken],authController.logouts);
router.post('/forgot-password',authController.forgotPassword);
router.post('/verify-otp',authController.verifyOtp);
router.post('/reset-password', authController.resetPassword);
module.exports =router;