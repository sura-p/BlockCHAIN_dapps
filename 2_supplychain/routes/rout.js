const control = require('../controller/control');
const express = require('express');
const router = express.Router();
router.post('/manufacturer',control.manufacturer);
router.get('/supplier',control.supplier);
router.post('/customer',control.change_ownership);
module.exports = router;
