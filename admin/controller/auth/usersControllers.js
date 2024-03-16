const express = require('express');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const db = require("../../../models");
const Sequelize = require('sequelize');
const AdminMoal = db.Admin;
require('dotenv').config();
const jwt = require('jsonwebtoken');
// Validation schema for user registration
const userValidation = require("../../../validation/user.validator");
const PORT = process.env.PORT;
const secreate = process.env.JWT_SECRET_KEY;
const { logout, authenticateToken } = require("../../../middleware/authenticateToken");
const nodemailer = require('nodemailer');
const Helper = require("../../../helper");

module.exports={

  login : async (req, res) => {
  try {
    const { email, password } = await userValidation.loginSchema.validateAsync(req.body);
    const user = await AdminMoal.findOne({
      where: {
        email,
      },
    });
    if (!user) {
    return   res.status(400).send({status:false,data:[],message:'Invalid credentials'});
    }
    else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return   res.status(400).send({status:false,data:[],message:'Invalid credentials password'});
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, secreate, {
        expiresIn: '5d',
      });

    return   res.status(200).send({status:true,access_token:token,message:'Login Successfully'});
    }
  } catch (error) {
    console.error(error);
        return   res.status(400).send({status:true,data:[],message:'Internal server error'});
      }
  },
  profile : async (req, res) => {
    res.json({
      status: true,
      data: req.user,
      message: "get Profile successfully"
    })
  },
  updateProfile : async (req, res) => {
    try {
      const { id, first_name, last_name, } = await userValidation.updateProfileSchema.validateAsync(req.body);
  
      checkedUser = await AdminMoal.findByPk(id);
      if (checkedUser) {
        checkedUser.first_name = first_name;
        checkedUser.loginSchema = last_name;
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
  },
  changePassword : async (req, res) => {
    try {
      const {  currentPassword, mewPassword } = await userValidation.changePasswordSchema.validateAsync(req.body);
   
      const user = await AdminMoal.findOne({
        where: {
          id:req.user.userId,
        },
      });
      if (!user) {
        return   res.status(400).send({status:false,data:[],message:'No record found'});
      }
      else {
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
        if (!isPasswordValid) {
         return   res.status(400).send({status:false,data:[],message:'invalid current password'});
        }
        const hashedPassword = await Helper.hashPasswordConvert(mewPassword);
  
        user.password = hashedPassword;
        await user.save();
        return   res.status(200).send({status:true,data:[],message:'Change password Successfully'});
     }
    } catch (err) {
      const data={
        err:err
      }
         return   res.status(400).send({status:true,data:[],message:'Internal server error'});
    }
  },
  forgotPassword : async (req, res) => {
    try {
      const { email } = await userValidation.forgotPasswordSchema.validateAsync(req.body);
  
      const user = await AdminMoal.findOne({
        where: { email },
        attributes: ['id', 'email', 'resetToken','otp','otpVerify'],
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
        user.otp = randomOTP;
       // const expirationTimestamp = Date.now() + 300000; // 5 minit in milliseconds
     //  user.resetTokenExpiration= new Date(expirationTimestamp),
        await user.save();
  
        const mailResponse = Helper.sendResetEmail(user.email, 'reset-password', data);
        if (mailResponse) {
          return res.status(200).send({
            status: true,
            data:{user_id:user.id},
            message: "Please check your email for the forgot password OTP",
          });
        } else {
          return res.status(401).send({
            status: false,
            message: "Mail sending failed. Please try again",
          });
        }
      } else {
        return res.status(401).send({
          status: false,
          message: "Email not found",
        });
      }
    } catch (error) {
      if (error instanceof Sequelize.ValidationError) {
        const errorMessages = error.errors.map(err => ({ field: err.path, message: err.message }));
        return res.status(400).send({ success: false, errors: errorMessages });
      } else {
        console.error(error);
        return res.status(500).send({ success: false, error: error.message });
      }
    }
  },
  logouts : async (req, res) => {
    logout(req, res);
  },
  resetPassword : async (req, res) => {
  
    try {
      const { user_id, newPassword } = await userValidation.resetPasswordSchema.validateAsync(req.body);
  
      // Validate reset token
      const user = await AdminMoal.findOne({
        where: {
          id:user_id,
        },
      });
  
      if (!user) {
        return res.status(401).send({
          status: false,
          message: 'Invalid or expired otp.',
        });
      }
  
      // Hash the new password
      const hashedPassword = await Helper.hashPasswordConvert(newPassword);
    //  console.log(hashedPassword);
      // Update user's password and reset token
      await AdminMoal.update(
        {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiration:null
        },
        {
          where: { id: user.id },
        }
      );
     return res.status(200).status({status:true,message:'Password reset successfully.'});
    } catch (error) {
     return res.status(400).status({status:true,message:'Internal error'});
    }
  },
  verifyOtp : async (req,res)=>{
    const {user_id,otp} = req.body;
     await AdminMoal.findOne({
        where:{
          id:user_id
        }
      }).then((result)=>{
        if(result.otp!=otp){
         return res.status(400).send({status:false,message:"Invalid otp Please again forgot password"});
        }
        else if(result.otp == otp){
          result.otp= null;
          result.otpVerify = true;
           result.save();
           return res.status(200).send({status:true,message:"Otp verify successfully"});
        }
      }).catch((err)=>{
        let data = {err:err};
        return res.status(400).send({status:false,message:"Something wan't wrong"});
      });
    
  }
}