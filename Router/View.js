const express = require('express');
const router = express.Router();
const ControllerView = require('../Controller/ControllerView');

router.get('/home', ControllerView.home);

router.get('/about', ControllerView.about);

router.get('/404-not-found', ControllerView.notFound);

module.exports = router;