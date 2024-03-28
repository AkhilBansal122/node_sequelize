const joi = require("joi");

const registerValidation = async (req,res,next)=>{

    const Schema = await joi.object().keys({
        first_name:joi.string().required(),
        last_name:joi.string().required(),
        username:joi.string().required(),
        email:joi.string().required(),
        password:joi.string().required(),
      role:joi.string().required().valid('admin','user'),
    });

   const {error}= Schema.validate(req.body,{abortEarly:false});
   if(error){
        res.status(200).json({
            error:error
        });
    }
    else{
        next();
    }
}
const loginValidation = async (req,res,next)=>{

    const Schema = await joi.object().keys({
        
        first_name:joi.string().required(),
        email:joi.string().required(),
        password:joi.string().required(),
        role: joi.when('first_name', {
            is: 'text',
            then: joi.string().valid('admin', 'user').required(),
            otherwise: joi.optional(),
        }),

    }).unknown(true);
    try {
        await Schema.validateAsync(req.body, { abortEarly: false });
        // If validation succeeds, move to the next middleware
        next();
    } catch (error) {
        // If validation fails, send the error response
        res.status(200).json({
            error: {
                message: 'Validation error',
                details: error.details,
            },
        });
    }

}

const profile  = async (req,res,next)=>{
  
    const Schema = await joi.object().keys({
        item:joi.object().keys({
            id:joi.number().required(),
            name:joi.string().required(),
        }),
        items:joi.array().items(joi.object().keys({
            id:joi.number().required(),
            name:joi.string().required(),
        })),
       limit: joi.number().required(),
      number:joi.array().min(joi.ref('limit')).required(),
      custom:joi.string().custom((value,msg)=>{
        if(value=='test'){
         return    msg.message ("not allow test name")
        }
        return true;
      })
    
    })
    const {error} = Schema.validate(req.body,{
        abortEarly:false
    });
    if(error!=undefined){
    //    console.log(error);
        res.status(200).json({
            error:error
        })
    }
    else{
        next();
    }
}
module.exports = {
    registerValidation,
    loginValidation,
    profile
}