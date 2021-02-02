const express = require('express');
const router = express.Router();
const passport = require('passport');
const ControllerPublic = require('../Controller/ControllerPublic');
const Auth = require('../middleware/Authentication');
const passportConfig = require('../middleware/passportConfig');

router.get('/home', ControllerPublic.home);
router.get('/login', ControllerPublic.login);
router.get('/registration', ControllerPublic.registration);
router.post('/action-login', Auth.login);
router.post('/action-registration', Auth.registration);

module.exports = router;