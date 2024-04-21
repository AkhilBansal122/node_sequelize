const express = require('express');
const router = express.Router();
const categoriesController = require("../../categories/controllers");
const { authenticateToken } = require("../../../middleware/authenticateToken");
const { addcategoriesSchema, editcategoriesSchema, listcategoriesSchema, statuscategoriesSchema,updatecategroiesSchema } = require('../schema/index');

router.post('/create',[authenticateToken,addcategoriesSchema],categoriesController.addNewcategories);
router.post('/listing', [authenticateToken,listcategoriesSchema], categoriesController.listingcategories);
router.post('/edit', [authenticateToken, editcategoriesSchema], categoriesController.editcategories);
router.post('/update', [authenticateToken,updatecategroiesSchema], categoriesController.updatecategories);
router.post('/status', [authenticateToken, statuscategoriesSchema], categoriesController.statuscategories);
router.post('/activesections', [authenticateToken], categoriesController.getActiveSection);


module.exports = router;