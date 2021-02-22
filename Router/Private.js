const express = require('express');
const router = express.Router();
const ControllerPrivate = require('../Controller/ControllerPrivate');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/avatar' });

router.get('/profile', ControllerPrivate.profile);
router.get('/account-detail', ControllerPrivate.accountDetail);
router.get('/change-password', ControllerPrivate.changPassword);
router.patch('/change-password', ControllerPrivate.UpdateChangPassword);
router.patch('/account-detail', upload.single('avatar'), ControllerPrivate.updateAccountDetail);

module.exports = router;