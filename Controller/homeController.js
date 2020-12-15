const accountStudent = require('../modelsController/accountStudent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie');

class homeController {

    pageNotFound(req, res, next) {
        res.render('pageNotFound');
    }

    mainInterface(req, res, next) {
        res.send('This view main home!');
    }

    about(req, res, next) {
        res.send('This view about home!');
    }

    login(req, res, next) {
        res.render('login');
    }

    register(req, res, next) {
        res.render('register');
    }

}

module.exports = new homeController;