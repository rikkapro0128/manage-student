const routerHome = require('./routerHome');

module.exports = function Router(app) {

    app.use('/', routerHome);

}