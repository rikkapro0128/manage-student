class ControllerPublic {

    pageNotFound(req, res, next) {
        res.render('pageNotFound');
    }

    home(req, res, next) {
        res.render('home');
    }

    about(req, res, next) {
        res.render('about');
    }

    login(req, res, next) {
        res.render('login');
    }

    registration(req, res, next) {
        res.render('register');
    }

}

module.exports = new ControllerPublic;