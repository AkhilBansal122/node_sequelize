const express = require('express');
const router = express.Router();
const productsController = require("../../products/controllers");
const { authenticateToken } = require("../../../middleware/authenticateToken");
const {  statusProductSchema, listsubProductSchema,updatecategroiesSchema,section_idSchema,category_idSchema } = require('../schema/index');

router.post('/create',[authenticateToken],productsController.addNewproduct);
router.post('/listing', [authenticateToken,listsubProductSchema], productsController.listingproduct);
// router.post('/edit', [authenticateToken, editsubcategoriesSchema], productsController.editsubcategories);
// router.post('/update', [authenticateToken,updatecategroiesSchema], productsController.updatesubcategories);
router.post('/status', [authenticateToken, statusProductSchema], productsController.statusproduct);
router.post('/activebrand', [authenticateToken], productsController.getActiveBrand);
router.post('/activecategoryBySectionId', [authenticateToken,section_idSchema], productsController.getActivecategoryBySectionId);
router.post('/activesubcategoryByCategoryId', [authenticateToken,category_idSchema], productsController.getActiveSubcategoryByCategoryId);


module.exports = router;