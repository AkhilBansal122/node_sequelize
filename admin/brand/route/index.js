const express = require('express');
const router = express.Router();
const brandController = require("../../brand/controller/index");
const { authenticateToken } = require("../../../middleware/authenticateToken");
const {  editbrandSchema, updatebrandSchema, listbrandSchema, statusBrandSchema } = require('../schema/index');

router.post('/listing', [authenticateToken,listbrandSchema], brandController.listingBrand);
router.post('/edit', [authenticateToken, editbrandSchema], brandController.editBrand);
router.post('/update', [authenticateToken], brandController.updateBrand);
router.post('/status', [authenticateToken, statusBrandSchema], brandController.statusBrand);

router.post('/create',[authenticateToken],brandController.addNewBrand);
module.exports = router;