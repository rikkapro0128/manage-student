const accountStudent = require('../modelsController/accountStudent');
const bcrypt = require('bcrypt');
const joi = require('joi');
const handleError = require('../middleware/handleEnrror');
const handle = require('../middleware/handleToken');

class authentication {

    async checkLogin(req, res, next) {
        try {
            const validateUser = joi.object({
                userName: joi.string().lowercase().required(),
                password: joi.string().required().min(6).max(20),
            });
            // validate form login
            await validateUser.validateAsync({
                userName: req.body.username,
                password: req.body.password,
            }).then(async(value) => { // return object value entered by user
                return value;
            }).then(async(value) => { // check value username is have in database
                const user = await accountStudent.findOne({ userName: value.userName });
                return user ? { user, value } : undefined; 
            }).then(async(data) => { // check value password is have in database
                if(!data) { throw new Error('User Name or Password Invalid!'); }
                const checked = await bcrypt.compare(data.value.password, data.user.hashPassword);
                return checked ? new Promise((resolve) => {
                    resolve(data.user);
                }) : checked;
            }).then((value) => { // create token then response to client
                if(!value) { throw new Error('User Name or Password Invalid!'); }
                const access_token = handle.generatorToken({ id: value._id });
                res.setHeader('access_token', `${access_token}`);
                // res.json({ token: access_token }).status(200);
                // res.redirect('/');
            })
            next();
        } catch (error) {
            next(error);
        }
    }

    async checkRegister(req, res, next) {
        try {
            const validateUser = joi.object({
                userName: joi.string().lowercase().required(),
                password: joi.string().required().min(6).max(20),
                passwordConfirm: joi.any().valid(joi.ref('password')).required(),
            });
            // validate form register
            await validateUser.validateAsync({
                userName: req.body.username,
                password: req.body.password,
                passwordConfirm: req.body.confirm_password,
            }).then(async(value) => { // return value was entered by user
                return value;
            }).then(async(value) => { // save account user created
                let data;
                await new accountStudent({
                    userName: value.userName,
                    hashPassword: value.password,
                    // ^^ two field is require when you want save database
                }).save().then(async(userStoraged) => {
                    data = userStoraged;
                })
                return data;
            }).then((value) => { // create token then response to client
                if(!value) { throw new Error('User Name or Password Invalid!'); }
                const access_token = handle.generatorToken({ id: value._id });
                res.setHeader('access_token', `${access_token}`);
                // res.json({ token: access_token }).status(200);
                // res.redirect('/');
            })
            next();
        } catch (error) {
            let err = handleError.requestSign(error); // throw error if username duplicate
            next(err) 
        }
    }
    
}

module.exports = new authentication();
