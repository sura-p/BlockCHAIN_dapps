const control = require('../controller/control');
const express = require('express');
const router = express.Router();

router.get('/account', control.main);
router.get('/account_connection',control.account_connection);
router.post('/mintTokens',control.mint_token);
router.get('/checkbalance',control.checkbalance);
router.post('/approve',control.approve);
router.post('/transferfrom',control.transfered);
router.get('/checkallowence',control.ckeckallowed);
router.post('/burn',control.burnT);
router.post('/transfer',control.transfere);
router.post('/transferowner',control.changeOwner);


module.exports = { router };