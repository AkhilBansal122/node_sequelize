const joi = require('joi');
const validationRequest =   require('../../../middleware/validationRequest');

// Validation schema for user login
module.exports={
	editProductSizeAttrSchema : async (req,res,next)=>{
		const schema=   joi.object().keys({
        	id:joi.number().required()
    	});
	    validationRequest(req, res, next, schema);
	},
	updateProductSizeAttrSchema : async (req,res,next)=>{

    schema =   joi.object().keys({
      sale_price:joi.number().required(),
      product_id:joi.number().required(),
      color_id:joi.number().required(),
      id:joi.number().required(),
      sku: joi.string().required(),
      qty:joi.number(),
        name: joi.string().min(2).required(),
       });
    validationRequest(req, res, next, schema);
},
listProductSizeAttrSchema: async (req,res,next)=>{
   schema=  joi.object({
    offset: joi.number().required(),
    limit: joi.number().required(),
  });
  validationRequest(req, res, next, schema)
},
  statusProductSizeAttrSchema : async (req,res,next)=>{
    schema=  joi.object().keys({
        id:joi.number().required(),
        status:joi.number().required()
    });
    validationRequest(req, res, next, schema);
},
addProductSizeAttrSchema : async (req, res, next) => {
    const schema = joi.object().keys({
      product_id:joi.number().required(),
      color_id:joi.number().required(),
      name: joi.string().min(3).max(30).required(),
      sku: joi.string().required(),
      qty:joi.number().required(),
      sale_price:joi.number().required()
    });
    validationRequest(req, res, next, schema);
  }  
}