const express = require('express');
const router = express.Router();
const homeController = require('../Controller/homeController');
const Auth = require('../middleware/Authentication');

router.get('/', homeController.mainInterface);
router.get('/about', homeController.about);
router.get('/face-login', homeController.login);
router.get('/face-register', homeController.register);
router.post('/action-login', Auth.checklogin);
router.post('/action-logout', Auth.logOut);
router.post('/action-register', Auth.checkRegister);
router.get('/show-token',Auth.hasBeenVerify ,Auth.showToken);
router.get('/page-not-found', homeController.pageNotFound);

module.exports = router;