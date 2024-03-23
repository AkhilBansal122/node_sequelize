const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).required(),
});
// Validation schema for user login
const updateProfileSchema = Joi.object().keys({

  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  image:Joi.string(),
  mobile: Joi.string().pattern(/^\+?[0-9]{10}$/).required(),
  
});
const fileSchema = Joi.object({
  filename: Joi.string().required(),
  mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
  size: Joi.number().max(5000000).required() // 5MB limit
});

const   changePasswordSchema= Joi.object({
  currentPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
  newPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
});

const forgotPasswordSchema= Joi.object({
  email: Joi.string().email().required()
});
const   resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().required()
})
module.exports = {
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema ,
  fileSchema
  

}