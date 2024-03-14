	const  Joi = require('joi');
const registrationSchema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().min(1).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).required(),
});
const updateProfileSchema = Joi.object({
  id: Joi.number().required(),
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
});
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
  mewPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
});
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});
const resetPasswordSchema = Joi.object({
  user_id: Joi.number().required(),
  newPassword: Joi.string().required()
});
module.exports={
	loginSchema,
	registrationSchema,updateProfileSchema,changePasswordSchema,forgotPasswordSchema,resetPasswordSchema
}