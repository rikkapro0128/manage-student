const express = require('express');
const router = express.Router();
const ControllerPrivate = require('../Controller/ControllerPrivate');

router.get('/profile', ControllerPrivate.profile);
router.get('/account-detail', ControllerPrivate.accountDetail);
router.get('/change-password', ControllerPrivate.changePassword);
router.get('/upload-story', ControllerPrivate.uploadStory);
router.get('/upload-story/add', ControllerPrivate.addStory);
router.get('/upload-story/edit/:idStory', ControllerPrivate.editStory);
router.delete('/upload-story/delete', ControllerPrivate.deleteStory);
router.post('/upload-story/add', ControllerPrivate.createStory);
router.post('/accept-make-author', ControllerPrivate.acceptMakeUser);
router.patch('/change-password', ControllerPrivate.UpdateChangePassword);
router.patch('/account-detail', ControllerPrivate.updateAccountDetail);

module.exports = router;
