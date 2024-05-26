const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../../../middleware/authenticateToken");
const {editProductAttrSchema,addProductAttrSchema,updateProductAttrSchema,listProductAttrSchema,statusProductAttrSchema} = require("../schema");
const ProductColorAttributeController = require("../controller/index");

router.post('/create',[authenticateToken],ProductColorAttributeController.addProductAttr);
router.post('/listing',[authenticateToken,listProductAttrSchema],ProductColorAttributeController.listingProductAttr);
router.post('/edit',[authenticateToken,editProductAttrSchema],ProductColorAttributeController.editProductAttr);
router.post('/update',[authenticateToken,updateProductAttrSchema],ProductColorAttributeController.updateProductAttr);
router.post('/status',[authenticateToken,statusProductAttrSchema],ProductColorAttributeController.statusProductAttr);



module.exports = router;