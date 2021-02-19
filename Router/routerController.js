const Public = require('./Public');
const Private = require('./Private');
const View = require('./View')
const checkToken = require('../middleware/checkSign');

module.exports = function Router(app) {

    app.use('/', View)

    app.use('/public', checkToken.isExpired, Public);

    app.use('/private', checkToken.checkLogin, Private);

}