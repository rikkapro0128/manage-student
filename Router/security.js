const express = require('express');
const passport = require('passport');
const router = express.Router();
const homeController = require('../Controller/homeController');
const passportConfig = require('../middleware/passportConfig');

router.get('/secret-account', homeController.showAccount);

module.exports = router;