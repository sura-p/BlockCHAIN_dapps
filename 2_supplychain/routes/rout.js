const control = require('../controller/control');
const express = require('express');
const router = express.Router();
router.post('/supplier',control.supplier);
router.get('/part',control.part_info1);
router.post('/changeo',control.change_ownership);
module.exports = router;
