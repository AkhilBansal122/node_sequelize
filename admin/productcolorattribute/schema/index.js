const joi = require('joi');
const validationRequest =   require('../../../middleware/validationRequest');

// Validation schema for user login
module.exports={
	editProductAttrSchema : async (req,res,next)=>{
		const schema=   joi.object({
        	id:joi.number().required()
    	});
	    validationRequest(req, res, next, schema);
	},
	updateProductAttrSchema : async (req,res,next)=>{
    schema =   joi.object({
      product_id:joi.number().required(),
        id:joi.number().required(),
        name: joi.string().min(2).required(),
       });
    validationRequest(req, res, next, schema);
},
listProductAttrSchema: async (req,res,next)=>{
   schema=  joi.object({
    offset: joi.number().required(),
    limit: joi.number().required(),
  });
  validationRequest(req, res, next, schema)
},
  statusProductAttrSchema : async (req,res,next)=>{
   schema=  joi.object().keys({
        id:joi.number().required(),
        status:joi.number().required()
    });
    validationRequest(req, res, next, schema);
},
addProductAttrSchema : async (req, res, next) => {
    const schema = joi.object().keys({
      product_id:joi.number().required(),
      name: joi.string().min(3).max(30).required(),
     });
    validationRequest(req, res, next, schema);
  }  
}