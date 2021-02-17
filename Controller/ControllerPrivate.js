class ControllerPrivate {

    profile(req, res, next) {
        res.render('profile');
    }

}

module.exports = new ControllerPrivate;