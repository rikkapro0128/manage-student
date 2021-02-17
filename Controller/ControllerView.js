class ControllerView {

    home(req, res, next) {
        res.render('home');
    }

    about(req, res, next) {
        res.render('about');
    }

    notFound(req, res, next) {
        res.render('not-found-404')
    }

}

module.exports = new ControllerView;