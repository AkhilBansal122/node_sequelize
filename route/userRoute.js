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

router.get('/reset-password/:token', userController.resetPassword);
//router.post('/reset-password-update', userController.resetPasswordUpdate);
router.post('/reset-password-update',userController.resetPasswordUpdate);
module.exports =router;