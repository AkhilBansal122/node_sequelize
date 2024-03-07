
var nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");

require('dotenv').config();

// Function to generate a random token
const generateResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Function to send reset password email
const sendResetEmail =async (email, type, data) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.MAIL_ID}`,
                pass: `${process.env.MAIL_PASSWORD}`
            }
        });
        if (type == 'reset-password') {
            var mailOptions = {
                from: `${process.env.MAIL_ID}`,
                to: email,
                subject: data.subject,
                html: data.html
            };
        }

     response = await   transporter.sendMail(mailOptions, function (error, info) {
            if (error != null) {
                return false;
            } else {
                return true;
            }
        });
        return response;
    } catch (error) {
        return false;
    }
}

const hashPasswordConvert = async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  };
  function generateOTP() {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}



module.exports = {
    generateResetToken,
    sendResetEmail,
    hashPasswordConvert,
    generateOTP
}
