const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../../../middleware/authenticateToken");
const {statusProductColorAttrSchema,editProductSizeAttrSchema,addProductSizeAttrSchema,updateProductSizeAttrSchema,listProductSizeAttrSchema,statusProductSizeAttrSchema} = require("../schema");
const ProductSizeAttributeController = require("../controller/index");

router.post('/create',[authenticateToken,addProductSizeAttrSchema],ProductSizeAttributeController.addProductSizeAttr);
router.post('/listing',[authenticateToken,listProductSizeAttrSchema],ProductSizeAttributeController.listingProductSizeAttr);
router.post('/edit',[authenticateToken,editProductSizeAttrSchema],ProductSizeAttributeController.editProductSizeAttr);
router.post('/update',[authenticateToken,updateProductSizeAttrSchema],ProductSizeAttributeController.updateProductAttr);
router.post('/status',[authenticateToken,statusProductSizeAttrSchema],ProductSizeAttributeController.statusProductSizeAttr);
router.post('/activeColorByProductId',[authenticateToken,statusProductColorAttrSchema],ProductSizeAttributeController.activeColorByProductId);

module.exports = router;