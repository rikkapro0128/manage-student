class ControllerPublic {

    login(req, res, next) {
        res.render('login');
    }

    registration(req, res, next) {
        res.render('register');
    }

}

module.exports = new ControllerPublic;