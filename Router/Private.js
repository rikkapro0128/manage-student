const express = require('express');
const router = express.Router();
const ControllerPrivate = require('../Controller/ControllerPrivate');

router.get('/profile', ControllerPrivate.profile);

module.exports = router;