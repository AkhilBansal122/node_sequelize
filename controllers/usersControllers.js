const express = require('express');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const db = require("../models");
const Sequelize = require('sequelize');
const UserModal = db.User;
require('dotenv').config();
const jwt = require('jsonwebtoken');
// Validation schema for user registration
const userValidation = require("../validation/user.validator");
const PORT = process.env.PORT;
const secreate = process.env.JWT_SECRET_KEY;
const { logout, authenticateToken } = require("../middleware/authenticateToken");
const nodemailer = require('nodemailer');
const Helper = require("../helper");


const register = async (req, res) => {
  try {
    const { firstName, lastName, role, username, email, password } = await userValidation.registrationSchema.validateAsync(req.body);

    // Check if the email already exists
    const existingUser = await UserModal.findOne({
      where: { email: email }
    });

    if (existingUser) {
      return res.json({
        status: false,
        message: "Email Address Already Exists"
      });
    }

    // Hash the password
    const hashedPassword = await Helper.hashPasswordConvert(password);

    // Create the user
    await UserModal.create({ firstName, lastName, username, email, password: hashedPassword, role });

    res.json({ status: true, message: "Record Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = await userValidation.loginSchema.validateAsync(req.body);
    const user = await UserModal.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(401).json({ status:false,message: 'Invalid credentials' });
    }
    else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ status:false, error: 'Invalid credentials password' });
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, secreate, {
        expiresIn: '1h',
      });
      res.status(200).json({status:true, token: token, expiresIn: 3600, data: user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false, message: 'Internal server error', error: error });
  }
}

const profile = async (req, res) => {
  res.json({
    status: true,
    data: req.user,
    message: "get Profile successfully"
  })
}

const updateProfile = async (req, res) => {
  try {
    const { id, firstName, lastName, } = await userValidation.updateProfileSchema.validateAsync(req.body);

    checkedUser = await UserModal.findByPk(id);
    if (checkedUser) {
      checkedUser.firstName = firstName;
      checkedUser.loginSchema = lastName;
      await checkedUser.save();
      res.json({ status: true, message: 'Profile updated successfully', data: checkedUser });
    }
    else {
      res.status(404).json({ status: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error', error: error });
  }
}

const changePassword = async (req, res) => {
  try {
    const {  currentPassword, mewPassword } = await userValidation.changePasswordSchema.validateAsync(req.body);
 
    const user = await UserModal.findOne({
      where: {
        id:req.user.userId,
      },
    });
    if (!user) {
      res.status(401).json({ message: 'No record found' });
    }
    else {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'invalid current password' });
      }
      const hashedPassword = await Helper.hashPasswordConvert(mewPassword);

      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        status: true,
        message: "password change successfully"
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', error: err });
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = await userValidation.forgotPasswordSchema.validateAsync(req.body);

    const user = await UserModal.findOne({
      where: { email },
      attributes: ['id', 'email', 'resetToken','otpEmail','otpVerify'],
    });

    if (user !== null) {
      // Replace with the actual user's email
   //   var resetToken = Helper.generateResetToken();

      const randomOTP = Helper.generateOTP();

     // const resetLink = `${process.env.BASE_URL}/api/users/reset-password/${resetToken}`; // Replace with your actual reset password link
      const data = {
        subject: "Forgot password",
      //  html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
        html: `<h3>OTP IS :${randomOTP}</h3>`
      };

      // Update only the resetToken attribute using save method
      user.otpEmail = randomOTP;
     // const expirationTimestamp = Date.now() + 300000; // 5 minit in milliseconds
   //  user.resetTokenExpiration= new Date(expirationTimestamp),
      await user.save();

      const mailResponse = Helper.sendResetEmail(user.email, 'reset-password', data);
      if (mailResponse) {
        res.status(200).json({
          status: true,

          message: "Please check your email for the forgot password OTP",
        });
      } else {
        res.status(401).json({
          status: false,
          message: "Mail sending failed. Please try again",
        });
      }
    } else {
      res.status(401).json({
        status: false,
        message: "Email not found",
      });
    }
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const errorMessages = error.errors.map(err => ({ field: err.path, message: err.message }));
      return res.status(400).json({ success: false, errors: errorMessages });
    } else {
      console.error(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
};

var logouts = async (req, res) => {
  logout(req, res);
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    try{
        const user = await UserModal.findOne({
      where: {
        resetToken:token,
      },
    });

  // Check if the user exists and if the reset token expiration time is set
    if (!user || !user.resetTokenExpiration) {
      return res.status(400).json({ success: false, error: 'Invalid reset token.' });
    }

    // Convert the stored timestamp to the same format as current time
    const storedExpiration = new Date(user.resetTokenExpiration).toISOString();
    const currentTimestamp = new Date().toISOString();

    // Compare the current time with the reset token expiration time
    if (storedExpiration > currentTimestamp) {
        return res.status(400).json({ success: false, error: 'Reset token has expired.' });
    }
    return res.status(200).json({ success: true, message: 'Reset password form shown.' });
      } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

const resetPasswordUpdate = async (req, res) => {
  
  try {
    const { resetToken, newPassword } = await userValidation.resetPasswordSchema.validateAsync(req.body);

    // Validate reset token
    const user = await UserModal.findOne({
      where: {
        resetToken,
        
      },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Invalid or expired reset token.',
      });
    }

    // Hash the new password
    const hashedPassword = await Helper.hashPasswordConvert(newPassword);
  //  console.log(hashedPassword);
    // Update user's password and reset token
    await UserModal.update(
      {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiration:null
      },
      {
        where: { id: user.id },
      }
    );

    res.status(200).json({
      status: true,
      message: 'Password reset successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      error:error,
      message: 'Internal server error.',
    });
  }
}
module.exports = {
  register,
  login,
  profile,
  updateProfile,
  changePassword,
  logouts, forgotPassword,
  resetPassword,
  resetPasswordUpdate
}