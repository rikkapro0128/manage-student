const accountStudent = require('../modelsController/accountStudent');
const bcrypt = require('bcrypt');

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

    async showAccount(req, res, next) {
        await accountStudent.find({})
            .then((users) => {
                return users;   
                // this is change in thirds
                // this is my comment
                // test conflict
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