const routerPublic = require('./routerPublic');
const security = require('./security');
const Auth = require('../middleware/Authentication');

module.exports = function Router(app) {

    app.use('/', routerPublic);

    app.use('/security', Auth.isLogin, security);

}