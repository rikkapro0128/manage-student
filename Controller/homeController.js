const accountStudent = require('../modelsController/accountStudent');
const bcrypt = require('bcrypt');

class homeController {

    pageNotFound(req, res, next) {
        res.render('pageNotFound');
    }
    
    authGoogle(req, res, next) {
        res.redirect('/');
    }

    mainInterface(req, res, next) {
        res.render('homePage');
    }

    about(req, res, next) {
        res.render('about');
    }

    login(req, res, next) {
        res.render('login');
    }

    register(req, res, next) {
        res.render('register');
    }

    async showAccount(req, res, next) {
        await accountStudent.find({})
            .then((users) => {
                return users;   
            })
            .then((data) => {
                res.json({
                    message: 'show count!',
                    user: data,
                })
            })
        next();
    }

}

module.exports = new homeController;