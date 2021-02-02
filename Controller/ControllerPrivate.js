class ControllerPrivate {

    upStory(req, res, next) {
        res.render('upStory');
    }

}

module.exports = new ControllerPrivate;