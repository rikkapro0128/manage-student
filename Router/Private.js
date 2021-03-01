const express = require('express');
const router = express.Router();
const ControllerPrivate = require('../Controller/ControllerPrivate');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/avatar' });

router.get('/profile', ControllerPrivate.profile);
router.get('/account-detail', ControllerPrivate.accountDetail);
router.get('/change-password', ControllerPrivate.changePassword);
router.get('/upload-story', ControllerPrivate.uploadStory);
router.get('/upload-story/add', ControllerPrivate.addStory);
router.post('/upload-story/add', upload.single('coverImage'), ControllerPrivate.createStory);
router.post('/accept-make-author', ControllerPrivate.acceptMakeUser);
router.patch('/change-password', ControllerPrivate.UpdateChangePassword);
router.patch('/account-detail', upload.single('avatar'), ControllerPrivate.updateAccountDetail);

module.exports = router;
