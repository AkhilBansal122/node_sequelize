const joi = require('joi');

// Validation schema for user login
const addbrandSchema = joi.object().keys({

    name: joi.string().min(2).required(),
    slug: joi.string(),
    image: joi.string(),
    description: joi.string(),
    meta_title: joi.string(),
    meta_description: joi.string(),
    meta_keywords: joi.string(),
    vendor_id: joi.number()
})
const editbrandSchema = joi.object().keys({
    id:joi.number().required()
})
const updatebrandSchema = joi.object().keys({
    id:joi.number().required(),
    name: joi.string().min(2).required(),
    slug: joi.string(),
    image: joi.string(),
    description: joi.string(),
    meta_title: joi.string(),
    meta_description: joi.string(),
    meta_keywords: joi.string(),
    vendor_id: joi.number()
})
const listbrandSchema = joi.object().keys({
    offset:joi.number().required(),
    limit:joi.number().required()
})
module.exports = {
    addbrandSchema,
    editbrandSchema,
    updatebrandSchema,
    listbrandSchema
}

