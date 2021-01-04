const express = require('express');
const passport = require('passport');
const router = express.Router();
const homeController = require('../Controller/homeController');
const Auth = require('../middleware/Authentication');
const passportConfig = require('../middleware/passportConfig')

router.get('/', homeController.mainInterface);
router.get('/about', homeController.about);
router.get('/face-login', homeController.login);
router.get('/face-register', homeController.register);
router.get('/secret-account', passport.authenticate('jwt', { session: false }), homeController.showAccount);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/404-not-found',
    session: false,
}), homeController.authGoogle);
router.post('/action-login', Auth.checkLogin);
router.post('/action-register', Auth.checkRegister);
router.get('/404-not-found', homeController.pageNotFound);

module.exports = router;