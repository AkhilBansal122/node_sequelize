const Joi = require('joi');
const validationRequest = require("../../middleware/validationRequest");

const loginSchema = async (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    validationRequest(req, res, next, schema);
}
const supdateProfileSchema = async (req, res, next) => {

    const schema = Joi.object().keys({

        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        image: Joi.string(),
        mobile: Joi.string().pattern(/^\+?[0-9]{10}$/).required(),
    });
    validationRequest(req, res, next, schema)

}
const updateProfileSchema = async (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        image: Joi.string(),
        mobile: Joi.string().pattern(/^\+?[0-9]{10}$/).required(),
    });
    validationRequest(req, res, next, schema);
}
const changePasswordSchema = async (req, res, next) => {
    schema = Joi.object({
        currentPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
        newPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
    });
    validationRequest(req, res, next, schema)

}

const forgotPasswordSchema = async (req, res, next) => {
    schema = Joi.object({
        email: Joi.string().email().required(),
    });
    validationRequest(req, res, next, schema)

}
const resetPasswordSchema = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        newPassword: Joi.string().required()
    });
    validationRequest(req, res, next, schema)
}
const verifyOtpSchema = async (req, res, next) => {

    const schema = Joi.object().keys({

        email: Joi.string().email().required(),
        otp: Joi.number().min(6).required(),
    });
    validationRequest(req, res, next, schema)

}
module.exports = {
    loginSchema,
    updateProfileSchema,
    verifyOtpSchema,
    resetPasswordSchema,
    forgotPasswordSchema,
    changePasswordSchema
}