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
    return   Helper.fail(res,[],'Invalid credentials');
    }
    else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
    return   Helper.fail(res,[],'Invalid credentials password');
   
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, secreate, {
        expiresIn: '1h',
      });

    return   Helper.success(res,{token:token},"Login Successfully");
    }
  } catch (error) {
    console.error(error);
        return   Helper.fail(res,[],"Internal server error");
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
    return  Helper.fail(res,[],"No record found");
    }
    else {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
       return Helper.fail(res,[],"invalid current password");
      }
      const hashedPassword = await Helper.hashPasswordConvert(mewPassword);

      user.password = hashedPassword;
      await user.save();
      return Helper.success(res,[],"Change password Successfully");
    }
  } catch (err) {
    const data={
      err:err
    }
       return Helper.fail(res,data,"Internal server error");
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
          data:{user_id:user.id},
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
  
  try {
    const { user_id, newPassword } = await userValidation.resetPasswordSchema.validateAsync(req.body);

    // Validate reset token
    const user = await UserModal.findOne({
      where: {
        id:user_id,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Invalid or expired otp.',
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
   return Helper.success(res,[],'Password reset successfully.');
  } catch (error) {
   return Helper.fail(res,{error:error},'error');
  }
}

const verifyOtp = async (req,res)=>{
  const {user_id,otp} = req.body;
   await UserModal.findOne({
      where:{
        id:user_id
      }
    }).then((result)=>{
      if(result.otpEmail!=otp){
       return Helper.fail(res,[],"Invalid otp Please again forgot password");
      }
      else if(result.otpEmail == otp){
        result.otpEmail= null;
        result.otpVerify = true;
         result.save();
    return  Helper.success(res,[],"Otp verify successfully"); 
      }
    }).catch((err)=>{
      let data = {err:err};
     return Helper.fail(res,data,"Something wan't wrong");
    });
  
}
module.exports = {
  register,
  login,
  profile,
  updateProfile,
  changePassword,
  logouts, forgotPassword,
  resetPassword,
  verifyOtp
}