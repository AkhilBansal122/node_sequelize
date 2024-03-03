	const  Joi = require('joi');
const registrationSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().min(1).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const updateProfileSchema = Joi.object({
  id: Joi.number().required(),
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
});
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().alphanum().min(3).max(30).required(),
  mewPassword: Joi.string().alphanum().min(3).max(30).required(),
});
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});
const resetPasswordSchema = Joi.object({
  resetToken: Joi.string().required(),
  newPassword: Joi.string().required()
});
module.exports={
	loginSchema,
	registrationSchema,updateProfileSchema,changePasswordSchema,forgotPasswordSchema,resetPasswordSchema
}