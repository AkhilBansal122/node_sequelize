const joi = require('joi');
const validationRequest =   require('../../../middleware/validationRequest');

// Validation schema for user login
module.exports={
	editsubcategoriesSchema : async (req,res,next)=>{
		const schema=   joi.object({
        	id:joi.number().required()
    	});
	    validationRequest(req, res, next, schema);
	},
	updatecategroiesSchema : async (req,res,next)=>{
    schema =   joi.object({
      category_id:joi.number().required(),
      id:joi.number().required(),
        name: joi.string().min(2).required(),
        meta_title: joi.string(),
        meta_description: joi.string(),
        meta_keywords: joi.string(),
    });
    validationRequest(req, res, next, schema);
},
listsubProductSchema: async (req,res,next)=>{
   schema=  joi.object({
    offset: joi.number().required(),
    limit: joi.number().required(),
  });
  validationRequest(req, res, next, schema)
},
statussubcategoriesSchema : async (req,res,next)=>{
   schema=  joi.object().keys({
        id:joi.number().required(),
        status:joi.number().required()
    });
    validationRequest(req, res, next, schema);
},
addsubcategoriesSchema : async (req, res, next) => {
    const schema = joi.object().keys({
      category_id:joi.number().required(),
      name: joi.string().min(3).max(30).required(),
      meta_title: joi.string(),
      meta_description: joi.string(),
      meta_keywords: joi.string(),
    });
    validationRequest(req, res, next, schema);
  }  
}