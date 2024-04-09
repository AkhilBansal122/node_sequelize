const express = require('express');
const bcrypt = require("bcryptjs");
const path = require('path');
const db = require("../../../models");
const Sequelize = require('sequelize');
const AdminModal = db.Admin;
require('dotenv').config();
const jwt = require('jsonwebtoken');
// Validation schema for user registration
const PORT = process.env.PORT;
const secreate = process.env.JWT_SECRET_KEY;
const { logout } = require("../../../middleware/authenticateToken");
const Helper = require("../../../helper");
const fs = require('fs');

const formidable = require('formidable');
function copyFile(source, destination, callback) {
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);

  readStream.on('error', callback);
  writeStream.on('error', callback);

  readStream.on('close', () => {
    fs.unlink(source, callback);
  });

  readStream.pipe(writeStream);
}
module.exports = {

  login: async (req, res) => {
    try {
      const { email, password } = await req.body;
      const user = await AdminModal.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(200).send({ status: false, data: [], message: 'Invalid credentials' });
      }
      else {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(200).send({ status: false, data: [], message: 'Invalid credentials password' });
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, secreate, {
          expiresIn: '5d',
        });

        const data = {
          id: user.id,
          email: user.email,
          image: Helper.imagePath(user.image),
          name: user.name,
          mobile: user.mobile,
          type: user.type
        }
        return res.status(200).send({ status: true, access_token: token, data: data, message: 'Login Successfully' });
      }
    } catch (error) {
      return res.status(200).send({ status: false, data: [], message: 'Internal server error' });
    }
  },
  profile: async (req, res) => {
    res.json({
      status: true,
      data: req.user,
      message: "get Profile successfully"
    })
  },


  updateProfile: async (req, res, next) => {
    let errorMessage = {};
    var message = "";
    const getProfile = await AdminModal.findOne({
      where: {
        id: req.user.userId
      }
    });
    if (!getProfile) {
      return res.status(400).send({ status: false, message: "No Record Found" });
    }
    const form = new formidable.IncomingForm();
    form.on('field', (name, value) => {
      if (name === 'email') {
        if (!value) {
            errorMessage.email = { message: "Email Field Is Required" };
            message = "Email Field Is Required";
        } else {
            getProfile.email = value;
        }
    }
    if (name === 'mobile') {
        if (!value) {
            errorMessage.mobile = { message: "Mobile Field Is Required" };
            message = "Mobile Field Is Required";
        } else {
            getProfile.mobile = value;
        }
    }
      });
    form.on('file', (name, file) => {
      file.field = name;
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        // Handle error
        return next(err);
      }
      if(!fields.mobile){
        errorMessage.mobile = { message: "Mobile Field Is Required" };
        message = "Mobile Field Is Required";
      }
      if(!fields.email){
        errorMessage.email = { message: "Email Field Is Required" };
        message = "Email Field Is Required";
      }
      
        
        // Access files here
        const allFiles = files.image;
        const rootDirectory = path.join(__dirname, '../../../');
        const newFolderDir = "/uploads/frontend/image";
        const uploadPath = path.join(rootDirectory, newFolderDir);

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        if (allFiles) {
          const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];

          if (!allowedFormats.includes(allFiles[0].mimetype)) {
            errorMessage.image = { message: "Only jpeg, jpg, and png image formats are allowed for Profile Picture" };
            message = "Only jpeg, jpg, and png image formats are allowed for Profile Picture";
          } else {
            const newFileName = Date.now() + "_" + req.user.userId + path.extname(allFiles[0].originalFilename);
            const sourcePath = allFiles[0].filepath; // corrected from allFiles[0].filepath
            const destinationPath = path.join(uploadPath, newFileName);
            const oldPath = path.join(__dirname, "../../../" + getProfile.image);

            // Remove existing file
            if (fs.existsSync(oldPath)) {

              fs.unlink(oldPath, (err) => {
                if (err) {
                  console.error(`Error removing file: ${err}`);
                  // Handle error
                } else {
                  console.log('File removed successfully');
                  // File removed successfully
                }
              });
            }

            // Copy file from source to destination
            fs.copyFile(sourcePath, destinationPath, (err) => {
              if (err) {
                console.error(`Error copying file: ${err}`);
                errorMessage.profile_picture = { message: "Error copying Profile Picture" };
                return res.status(500).json({ error: "Error copying file" });
              } else {
                getProfile.image = newFolderDir + "/" + newFileName;

                // Continue with your code logic
              }
            });

            getProfile.image = newFolderDir + "/" + newFileName;
          }
        }
      
      if (Object.keys(errorMessage).length > 0) {
        return res.status(400).json({ status: false, status_code: 400, errorMessage, message: message });
      }

      const response = await getProfile.save();
      if (response) {
        return res.status(200).send({
          status: true,
          message: "Profile Updated Successfully"
        });
      } else {
        return res.status(400).send({
          status: false,
          message: "Something went wrong"
        });
      }
    });

  },



  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await AdminModal.findOne({
        where: {
          id: req.user.userId,
        },
      });
      if (!user) {
        return res.status(200).send({ status: false, data: [], message: 'No record found' });
      }
      else {
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
          return res.status(200).send({ status: false, data: [], message: 'invalid current password' });
        }
        const hashedPassword = await Helper.hashPasswordConvert(newPassword);

        user.password = hashedPassword;
        await user.save();
        return res.status(200).send({ status: true, data: [], message: 'Change password Successfully' });
      }
    } catch (err) {
      const data = {
        err: err
      }
      return res.status(200).send({ status: true, data: [], message: 'Internal server error' });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await AdminModal.findOne({
        where: { email },
        attributes: ['id', 'email', 'resetToken', 'otp', 'otpVerify'],
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
            data: { email: email },
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
  logouts: async (req, res) => {
    logout(req, res);
  },



  verifyOtp: async (req, res) => {
    const { email, otp } = req.body;
    await AdminModal.findOne({
      where: {
        email: email
      }
    }).then((result) => {
      if (result.otp != otp) {
        return res.status(200).send({ status: false, message: "Invalid otp Please again forgot password" });
      }
      else if (result.otp == otp) {
        result.otp = null;
        result.otpVerify = true;
        result.save();
        return res.status(200).send({ status: true, message: "Otp verify successfully" });
      }
    }).catch((err) => {
      let data = { err: err };
      return res.status(200).send({ status: false, message: "Something wan't wrong" });
    });

  },
  resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const user = await AdminModal.findOne({
        where: {
          email: email,
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
          resetTokenExpiration: null
        },
        {
          where: { id: user.id },
        }
      );
      return res.status(200).send({ status: true, message: 'Password reset successfully.' });
    }
    catch (error) {
      return res.status(200).send({ status: true, message: 'Internal error' });
    }
  }
}