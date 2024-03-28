const express = require('express');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const db = require("../../../models");
const Sequelize = require('sequelize');
const AdminModal = db.Admin;
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
    const { email, password } = await req.body;
    const user = await AdminModal.findOne({
      where: {
        email,
      },
    });
    if (!user) {
    return   res.status(200).send({status:false,data:[],message:'Invalid credentials'});
    }
    else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return   res.status(200).send({status:false,data:[],message:'Invalid credentials password'});
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, secreate, {
        expiresIn: '5d',
      });

      const data={
        id:user.id,
        email :user.email,
        image:Helper.imagePath(user.image),
        name:user.name,
        mobile:user.mobile,
        type:user.type
      }
    return   res.status(200).send({status:true,access_token:token,data:data,message:'Login Successfully'});
    }
  } catch (error) {
    console.error(error);
        return   res.status(200).send({status:false,data:[],message:'Internal server error'});
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

    const { id, name, email, mobile } = await req.body;
    let image = req.file ? req.file.path : null; // Assuming you're using multer or similar middleware for file uploads

    // Find user by userId, assuming userId is available in req.body
    let checkedUser = await AdminModal.findByPk(req.user.userId);

    if (!checkedUser) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    // Update user data if found
    checkedUser.name = name;
    checkedUser.email = email;
    checkedUser.mobile = mobile;
    if (image) {
      Helper.removeImageFromFolder(checkedUser.image);
      checkedUser.image = image;
    }
    await checkedUser.save();

    // Prepare response data
    const data = {
      id: checkedUser.id,
      email: checkedUser.email,
      image:Helper.imagePath(checkedUser.image),
      name: checkedUser.name,
      mobile: checkedUser.mobile,
      type: checkedUser.type
    };

   return res.status(200).send({ status: true, message: 'Profile updated successfully', data: data });
  } catch (error) {
    console.error(error);
   return res.status(500).send({ status: false, message: 'Internal server error', error: error });
  }
},

  changePassword : async (req, res) => {
    try {
      const {  currentPassword, newPassword } = req.body;
   
      const user = await AdminModal.findOne({
        where: {
          id:req.user.userId,
        },
      });
      if (!user) {
        return   res.status(200).send({status:false,data:[],message:'No record found'});
      }
      else {
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
        if (!isPasswordValid) {
         return   res.status(200).send({status:false,data:[],message:'invalid current password'});
        }
        const hashedPassword = await Helper.hashPasswordConvert(newPassword);
  
        user.password = hashedPassword;
        await user.save();
        return   res.status(200).send({status:true,data:[],message:'Change password Successfully'});
     }
    } catch (err) {
      const data={
        err:err
      }
         return   res.status(200).send({status:true,data:[],message:'Internal server error'});
    }
  },
  forgotPassword : async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await AdminModal.findOne({
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
            data:{email:email},
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
        return res.status(200).send({ success: false, errors: errorMessages });
      } else {
        console.error(error);
        return res.status(500).send({ success: false, error: error.message });
      }
    }
  },
  logouts : async (req, res) => {
    logout(req, res);
  },

  

  verifyOtp : async (req,res)=>{
    const {email,otp} = req.body;
     await AdminModal.findOne({
        where:{
          email:email
        }
      }).then((result)=>{
        if(result.otp!=otp){
         return res.status(200).send({status:false,message:"Invalid otp Please again forgot password"});
        }
        else if(result.otp == otp){
          result.otp= null;
          result.otpVerify = true;
           result.save();
           return res.status(200).send({status:true,message:"Otp verify successfully"});
        }
      }).catch((err)=>{
        let data = {err:err};
        return res.status(200).send({status:false,message:"Something wan't wrong"});
      });
    
  },
  resetPassword : async (req,res)=>{
    try{
      const { email, newPassword } = req.body;
      const user = await AdminModal.findOne({
        where: {
          email:email,
        },
      });

    if (!user) {
        return res.status(401).send({
          status: false,
          message: 'Invalid email.',
        });
      }
      const hashedPassword = await Helper.hashPasswordConvert(newPassword);

      await AdminModal.update(
      {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiration:null
      },
      {
        where: { id: user.id },
        }
      );
     return res.status(200).send({status:true,message:'Password reset successfully.'});
    }
    catch (error) {
     return res.status(200).send({status:true,message:'Internal error'});
    }
  }
}