const joi = require('joi');
const validationRequest =   require('../../../middleware/validationRequest');

// Validation schema for user login
module.exports={
	editcategoriesSchema : async (req,res,next)=>{
		const schema=   joi.object({
        	id:joi.number().required()
    	});
	    validationRequest(req, res, next, schema);
	},
	updatecategroiesSchema : async (req,res,next)=>{
    schema =   joi.object({
      section_id:joi.number().required(),
        id:joi.number().required(),
        name: joi.string().min(2).required(),
        meta_title: joi.string(),
        meta_description: joi.string(),
        meta_keywords: joi.string(),
    });
    validationRequest(req, res, next, schema);
},
listcategoriesSchema: async (req,res,next)=>{
   schema=  joi.object({
    offset: joi.number().required(),
    limit: joi.number().required(),
  });
  validationRequest(req, res, next, schema)
},
statuscategoriesSchema : async (req,res,next)=>{
   schema=  joi.object().keys({
        id:joi.number().required(),
        status:joi.number().required()
    });
    validationRequest(req, res, next, schema);
},
addcategoriesSchema : async (req, res, next) => {
    const schema = joi.object().keys({
      section_id:joi.number().required(),
      name: joi.string().min(3).max(30).required(),
      meta_title: joi.string(),
      meta_description: joi.string(),
      meta_keywords: joi.string(),
    });
    validationRequest(req, res, next, schema);
  }  
}