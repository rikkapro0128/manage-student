const accountStudent = require('../modelsController/accountStudent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie');
const { info } = require('node-sass');

class authentication {

    hasBeenVerify(req, res, next) {
        let isHave = req.headers.cookie;
        let token = isHave ? cookie.parse(req.headers.cookie || '').access_token.split(' ')[1] : '';
        jwt.verify(token, process.env.CODE_SERCET, function(err, decoded) {
            if(err) {
                return res.redirect('/face-login');
            }
            if(decoded) {
                req.body.info = { decoded, token };
                return next() 
            }
        })

    }

    showToken(req, res, next) {

        res.json({
            token: req.body.info,
        }).status(301);

    }

    logOut(req, res, next) {
        try {
            res.clearCookie('access_token', { 
                path: '/',
                httpOnly: true,
                domain: 'http://localhost:3000'
            });
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    async checklogin(req, res, next) {
        try {
            const checkUser = await accountStudent.findOne({ userName: req.body.username });
            if(checkUser) {
                const isMatch = await bcrypt.compare(req.body.password, checkUser.hashPassword);
                    if(isMatch) {
                        const payload = req.body.username;
                        const access_token = jwt.sign({ data: payload }, process.env.CODE_SERCET, {
                            expiresIn: 60,
                        });
                        res.cookie('access_token', 'Bear ' + access_token, {
                            path: '/',
                            httpOnly: true,
                        });            
                    }else {
                        throw Error('Password input is invalid!'); 
                    }
            res.redirect('/');
            next();
            }else {
                throw Error('Account is not exist');
            }
        } catch (error) {
            next(error);
        }
    }

    async checkRegister(req, res, next) {
        try {
            const check = await accountStudent.findOne({ userName: req.body.username });
            if(!req.body.username || !req.body.password) {
                throw Error('Account missing Password or UserName!');
            }
            if(req.body.password !== req.body.confirm_password) {
                throw Error('Password is invalid!');
            }
            if(check) {
                throw Error('UserName is invalid!');
            }
            await new accountStudent({
                userName: req.body.username,
                hashPassword: req.body.password,
                // ^^ two field is require when you want save database
            }).save();
            res.redirect('/');
            next();
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new authentication();
