const handleToken = require('./handleToken');

class checkToken {

    isExpired(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const state = handleToken.verifyToken(token);
        return state ? res.redirect('/home') : next();
    }

    checkLogin(req, res, next) {
        // check login
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const state = handleToken.verifyToken(token);
        // if user never signin or signup, throw aleart
        return state ? next() : res.redirect('/404-not-found');
    }
    
}

module.exports = new checkToken;
