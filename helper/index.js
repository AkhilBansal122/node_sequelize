
var nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Function to generate a random token
const generateResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Function to send reset password email
const sendResetEmail = async (email, type, data) => {
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

        response = await transporter.sendMail(mailOptions, function (error, info) {
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

function success(res, data, message) {
    return res.json({
        status: true,
        data: data,
        message: message
    });
}

function fail(res, data, message) {
    return res.json({
        status: false,
        data: data,
        message: message
    });
}
function imagePath(filePath = null) {
    // Normalize the file path to ensure it works across different operating systems
    const normalizedFilePath = filePath.replace(/\\/g, '/'); // Replacing backslashes with forward slashes for URL compatibility
    return process.env.BASE_URL + process.env.PORT +  normalizedFilePath;
}

function removeImageFromFolder  (filePath = null){
    // Check if the file exists
    if (filePath) {

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return false;
            }

            // File exists, so delete it
            fs.unlink(filePath, (err) => {
                if (err) {
                    return false;
                }
                return true;
            });
        });
    }
}
// Function to extract and format error messages
function validateData(schema, req, res, next) {
    const data = req.body; // Assuming form data is parsed and available in req.body
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        const validationErrors = error.details.map(detail => {
            return {
                field: detail.context.key,
                message: detail.message
            };
        });
        return res.status(200).send({ status: false, message: validationErrors });
    } else {
        next();
    }
}
function createSlug(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = {
    generateResetToken,
    sendResetEmail,
    hashPasswordConvert,
    generateOTP,
    fail,
    success,
    imagePath,
    removeImageFromFolder,
    validateData,
    createSlug
}
