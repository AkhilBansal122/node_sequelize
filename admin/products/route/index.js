const express = require('express');
const router = express.Router();
const productsController = require("../../products/controllers");
const { authenticateToken } = require("../../../middleware/authenticateToken");
const {  statusProductSchema, listsubProductSchema,editProductsSchema,section_idSchema,category_idSchema } = require('../schema/index');

router.post('/create',[authenticateToken],productsController.addNewproduct);
router.post('/listing', [authenticateToken,listsubProductSchema], productsController.listingproduct);
 router.post('/edit', [authenticateToken, editProductsSchema], productsController.editProductcategories);
 router.post('/update', [authenticateToken], productsController.updateProducts);
router.post('/status', [authenticateToken, statusProductSchema], productsController.statusproduct);
router.post('/activebrand', [authenticateToken], productsController.getActiveBrand);
router.post('/activecategoryBySectionId', [authenticateToken,section_idSchema], productsController.getActivecategoryBySectionId);
router.post('/activesubcategoryByCategoryId', [authenticateToken,category_idSchema], productsController.getActiveSubcategoryByCategoryId);
router.post('/view', [authenticateToken, editProductsSchema], productsController.viewProductproduct);


module.exports = router;