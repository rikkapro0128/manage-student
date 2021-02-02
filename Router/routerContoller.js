const Public = require('./Public');
const Private = require('./Private');
const Auth = require('../middleware/Authentication');

module.exports = function Router(app) {

    app.use('/public', Public);

    app.use('/private', Auth.checkLogin, Private);

}