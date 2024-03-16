const Joi = require('joi');

module.exports = {
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).required(),
  }),
  // Validation schema for user login
  updateProfileSchema: Joi.object({
    id: Joi.number().required(),
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
  }),
  changePasswordSchema: Joi.object({
    currentPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
    mewPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
  }),
  forgotPasswordSchema: Joi.object({
    email: Joi.string().email().required()
  }),
  resetPasswordSchema: Joi.object({
    user_id: Joi.number().required(),
    newPassword: Joi.string().required()
  })
}