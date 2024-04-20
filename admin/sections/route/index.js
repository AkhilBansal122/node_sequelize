const express = require('express');
const router = express.Router();
const sectionsController = require("../../sections/controllers");
const { authenticateToken } = require("../../../middleware/authenticateToken");
const { addsectionsSchema, editsectionsSchema, listsectionsSchema, statussectionsSchema } = require('../schema/index');

router.post('/create',[authenticateToken,addsectionsSchema],sectionsController.addNewsections);
router.post('/listing', [authenticateToken,listsectionsSchema], sectionsController.listingsections);
router.post('/edit', [authenticateToken, editsectionsSchema], sectionsController.editsections);
router.post('/update', [authenticateToken], sectionsController.updatesections);
router.post('/status', [authenticateToken, statussectionsSchema], sectionsController.statussections);

module.exports = router;