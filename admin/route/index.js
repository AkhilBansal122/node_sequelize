const express = require('express');
const router = express.Router();

const {  changePasswordSchema, forgotPasswordSchema, resetPasswordSchema, verifyOtpSchema, formDataSchema } = require("../../validation/user.validator");
const authController = require("../controller/auth/usersControllers");
const { authenticateToken } = require("../../middleware/authenticateToken");
const { loginSchema } = require("../schema");


router.post('/login', loginSchema, authController.login);
router.get('/profile', [authenticateToken], authController.profile);
router.post('/update-profile', [authenticateToken], authController.updateProfile);

router.post('/change-password', [authenticateToken, changePasswordSchema, authController.changePassword]);
router.post('/logout', [authenticateToken], authController.logouts);
router.post('/forgot-password', [forgotPasswordSchema], authController.forgotPassword);
router.post('/verify-otp', [verifyOtpSchema], authController.verifyOtp);
router.post('/reset-password', [resetPasswordSchema], authController.resetPassword);
router.get('/create_customer',[authenticateToken],authController.createCustomer);
router.post('/addCard',[authenticateToken],authController.addCard);


module.exports = router;