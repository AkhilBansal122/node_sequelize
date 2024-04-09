const Joi = require('joi');
const validationRequest =   require('../middleware/validationRequest');
const loginSchema =async (req,res,next)=>{
  schema =  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).required(),
  });
  validationRequest(req, res, next, schema)
}
// Validation schema for user login
const updateProfileSchema = async (req,res,next)=>{

const schema = Joi.object().keys({

  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  image:Joi.string(),
  mobile: Joi.string().pattern(/^\+?[0-9]{10}$/).required(),
});
validationRequest(req, res, next, schema)

}
const fileSchema =async (req, res, next)=>{
  schema = Joi.object({
    filename: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
    size: Joi.number().max(5000000).required() // 5MB limit
  });
  validationRequest(req, res, next, schema)

}

const   changePasswordSchema= async (req,res,next)=>{
  schema = Joi.object({
    currentPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
    newPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/).min(3).max(30).required(),
  });
  validationRequest(req, res, next, schema)

}

const forgotPasswordSchema= async (req,res,next)=>{
  schema =   Joi.object({
    email: Joi.string().email().required(),
  });
  validationRequest(req, res, next, schema)

}
const   resetPasswordSchema = async (req,res,next)=>{
  const schema = Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().required()
  });
  validationRequest(req, res, next, schema)
}
const verifyOtpSchema = async (req,res,next)=>{

  const schema = Joi.object().keys({
  
    email: Joi.string().email().required(),
    otp: Joi.number().min(6).required(),
  });
  validationRequest(req, res, next, schema)
  
  }
  const formDataSchema = async (req,res,next)=>{
   schema =  Joi.object({
      name: Joi.string().required(), // Validate name as required string
      image: Joi.any() // Allow any file type for image upload
          .required()
          .custom((value, helpers) => {
              // Validate file type (you can add more checks here)
              if (!value.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                  return helpers.error('any.invalid');
              }
              return value;
          })
  }).options({ abortEarly: false });
  validationRequest(req,res,next,schema);
  } // Return all errors, not just the first one

module.exports = {
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema ,
  fileSchema,
  verifyOtpSchema,
  formDataSchema
  

}