const express = require('express');
const router = express.Router();
const subcategoriesController = require("../../subcategories/controllers");
const { authenticateToken } = require("../../../middleware/authenticateToken");
const { addsubcategoriesSchema, editsubcategoriesSchema, listsubcategoriesSchema, statussubcategoriesSchema,updatecategroiesSchema } = require('../schema/index');

router.post('/create',[authenticateToken,addsubcategoriesSchema],subcategoriesController.addNewsubcategories);
router.post('/listing', [authenticateToken,listsubcategoriesSchema], subcategoriesController.listingsubcategories);
router.post('/edit', [authenticateToken, editsubcategoriesSchema], subcategoriesController.editsubcategories);
router.post('/update', [authenticateToken,updatecategroiesSchema], subcategoriesController.updatesubcategories);
router.post('/status', [authenticateToken, statussubcategoriesSchema], subcategoriesController.statussubcategories);
router.post('/activecategory', [authenticateToken], subcategoriesController.getActiveCategory);


module.exports = router;