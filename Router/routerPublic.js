const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../Controller/homeController');
const Auth = require('../middleware/Authentication');
const passportConfig = require('../middleware/passportConfig');

router.get('/face-login', Auth.stopLoginOrRegister , homeController.login);
router.get('/face-register', Auth.stopLoginOrRegister, homeController.register);
router.get('/', homeController.mainInterface);
router.get('/about', homeController.about);
router.get('/404-not-found', homeController.pageNotFound);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/404-not-found',
    session: false,
}), homeController.authGoogle);
router.post('/action-login', Auth.checkLogin);
router.get('/action-logout', Auth.logout);
router.post('/action-register', Auth.checkRegister);

module.exports = router;