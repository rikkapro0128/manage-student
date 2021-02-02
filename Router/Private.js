const express = require('express');
const router = express.Router();
const ControllerPrivate = require('../Controller/ControllerPrivate');

router.get('/up-story', ControllerPrivate.upStory);

module.exports = router;