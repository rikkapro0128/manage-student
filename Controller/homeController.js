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

    registration(req, res, next) {
        res.render('register');
    }

    async showAccount(req, res, next) {
        try {
            await accountStudent.find({})
                .then((data) => {
                    const account = data.map(data => data.toObject());
                    res.render('showAccount', {
                        message: 'Show Account!',
                        user: account,
                    })
                })
                return;
            } catch (error) {
                next(error);
            }
    }

}

module.exports = new homeController;