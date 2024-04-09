const joi = require('joi');
const validationRequest =   require('../../../middleware/validationRequest');

// Validation schema for user login
const editbrandSchema = async (req,res,next)=>{
 const schema=   joi.object({
        id:joi.number().required()
    });
    validationRequest(req, res, next, schema);
}

const updatebrandSchema = async (req,res,next)=>{
    schema =   joi.object({
        id:joi.number().required(),
        name: joi.string().min(2).required(),
        slug: joi.string(),
        image: joi.string(),
        description: joi.string(),
        meta_title: joi.string(),
        meta_description: joi.string(),
        meta_keywords: joi.string(),
        vendor_id: joi.number()
    });
    validationRequest(req, res, next, schema);
}

const   listbrandSchema= async (req,res,next)=>{
   schema=  joi.object({
    offset: joi.number().required(),
    limit: joi.number().required(),
  });
  validationRequest(req, res, next, schema)
}

const statusBrandSchema = async (req,res,next)=>{
   schema=  joi.object().keys({
        id:joi.number().required(),
        status:joi.number().required()
    });
    validationRequest(req, res, next, schema);
}
const addbrandSchemas = async (req, res, next) => {
    const schema = joi.object().keys({
      name: joi.string().min(3).max(30).required(),
      meta_title: joi.string(),
      meta_description: joi.string(),
      meta_keywords: joi.string(),
      image: joi.any()
    });
    validationRequest(req, res, next, schema);
  }
module.exports = {
    editbrandSchema,
    updatebrandSchema,
    listbrandSchema,
    statusBrandSchema,
    addbrandSchemas
    
}

