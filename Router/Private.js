const express = require('express');
const router = express.Router();
const ControllerPrivate = require('../Controller/ControllerPrivate');

router.get('/profile', ControllerPrivate.profile);
router.get('/account-detail', ControllerPrivate.accountDetail);
router.get('/change-password', ControllerPrivate.changPassword);
router.patch('/change-password', ControllerPrivate.UpdateChangPassword);
router.patch('/account-detail', ControllerPrivate.updateAccountDetail);

module.exports = router;