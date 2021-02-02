const accountStudent = require('../modelsController/accountStudent');
const bcrypt = require('bcrypt');
const joi = require('joi');
const handleError = require('../middleware/handleEnrror');
const handle = require('../middleware/handleToken');

class authentication {

    async login(req, res, next) {
        try {
            const validateUser = joi.object({
                fullName: joi.string().lowercase().required(),
                email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                password: joi.string().required().min(6).max(20),   
            });
            // validate form login
            await validateUser.validateAsync({
                fullName: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
            }).then(async(value) => { // return object value entered by user
                return value;
            }).then(async(value) => { // check value username is have in database
                const user = await accountStudent.findOne({ fullName: value.fullName });
                return user ? { user, value } : undefined; 
            }).then(async(data) => { // check value password is have in database
                if(!data) { throw new Error('User Name or Password Invalid!'); }
                const checked = await bcrypt.compare(data.value.password, data.user.hashPassword);
                return checked ? new Promise((resolve) => {
                    resolve(data.user);
                }) : checked;
            }).then((value) => { // create token then response to client
                if(!value) { throw new Error('User Name or Password Invalid!'); }
                const access_token = handle.generatorToken(value);
                res.cookie('Authorization', 'Bearer ' + access_token);
                res.redirect('/public/home');
            })
            next();
        } catch (error) {
            next(error);
        }
    }

    async registration(req, res, next) {
        try {
            const validateUser = joi.object({
                fullName: joi.string().lowercase().required(),
                email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                password: joi.string().required().min(6).max(20),
                passwordConfirm: joi.any().valid(joi.ref('password')).required(),
            });
            // validate form register
            await validateUser.validateAsync({
                fullName: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.re_password,
            }).then(async(value) => { // return value was entered by user
                return value;
            }).then(async(value) => { // save account user created
                // console.log(value)
                let data;
                await new accountStudent({
                    fullName: value.fullName,
                    email: value.email,
                    hashPassword: value.password,
                    // ^^ two field is require when you want save database
                }).save().then(async(userStoraged) => {
                    data = userStoraged;
                })
                // console.log(data)
                return data;
            }).then((value) => { // create token then response to client
                if(!value) { throw new Error('User Name or Password Invalid!'); }
                const access_token = handle.generatorToken({ id: value._id });
                res.cookie('Authorization', 'Bearer ' + access_token);
                res.redirect('/public/home');
                // res.json({ token: access_token }).status(200);
            })
            res.redirect('/');
        } catch (error) {
            next(error) 
        }
    }

    checkLogin(req, res, next) {
        try {
            if(req.cookies.Authorization && handle.verifyToken(req)) {
                next();
            }else {
                res.render('mustSign');
            }
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new authentication();
