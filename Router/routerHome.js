const express = require('express');
const router = express.Router();
const homeController = require('../Controller/homeController');
const Auth = require('../middleware/Authentication');

router.get('/', homeController.mainInterface);
router.get('/about', homeController.about);
router.get('/face-login', homeController.login);
router.get('/face-register', homeController.register);
router.post('/action-login', Auth.checkLogin);
router.post('/action-register', Auth.checkRegister);

module.exports = router;