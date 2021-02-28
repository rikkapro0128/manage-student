const user = require('../modelsController/account.js');
const handleToken = require('../middleware/handleToken.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const joi = require('joi');

class ControllerPrivate {

    async profile(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            res.render('profile', {
                data,
                profile: true,
            });
        }
    }
    async accountDetail(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            res.render('profile', {
                data,
                accountDetail: true,
            });
        }
    }

    async updateAccountDetail(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(req.file) {
            req.body.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
            await user.findOneAndUpdate({ _id: payload.id }, { 
                $set: { 
                    infoAccount: req.body,
                    'infoAccount.lastModified': new Date,
                },
            });
        }else {
            await user.findOneAndUpdate({ _id: payload.id }, { 
                $set: { 
                    'infoAccount.firstName': req.body.firstName,
                    'infoAccount.lastName': req.body.lastName,
                    'infoAccount.age': req.body.age,
                    'infoAccount.gender': req.body.gender,
                    'infoAccount.lastModified': new Date,
                },
            });
        }
        res.redirect('#');
    }

    async changePassword(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            res.render('profile', {
                data,
                changePassword: true,
            });
        }
    }

    async UpdateChangePassword(req, res, next) {
        const validateUser = joi.object({
            oldPassword: joi.string().required().min(6).max(20),
            newPassword: joi.string().required().min(6).max(20),
            confirmPassword: joi.any().valid(joi.ref('newPassword')).required(),
        });
        await validateUser.validateAsync({
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword,
            confirmPassword: req.body.confirmPassword,
        }).then(async(data) => { // check value password is have in database
            if(!data) { throw new Error('User Name or Password Invalid!'); }
            const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
            const payload = handleToken.getPayLoad(token);
            const account = await user.findOne({ _id: payload.id });
            await bcrypt.compare(data.oldPassword, account.hashPassword).then(async function(result) {
                if(result) {
                    await bcrypt.hash(data.newPassword, saltRounds).then(async function(hash) {
                        // Store hash in your password DB.
                        await user.findOneAndUpdate({ _id: payload.id }, { hashPassword: hash });
                        res.redirect('#');
                    });
                }else {
                    res.json({ message: 'Mật khẩu cũ bạn nhập chưa có đúng nè~~!' });
                }
            })
        })
    }

    async uploadStory(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            if(data.infoAccount.typeUser === 'watcher') {
                res.render('profile', {
                    data,
                    registrationAuthor: true,
                });
            }
            else if(data.infoAccount.typeUser === 'author') {
                res.render('profile', {
                    data,
                    uploadStory: true,
                });
            }
        }
    }

    async addStory(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            if(data.infoAccount.typeUser === 'watcher') {
                res.render('profile', {
                    data,
                    registrationAuthor: true,
                });
            }
            else if(data.infoAccount.typeUser === 'author') {
                res.render('profile', {
                    data,
                    addStory: true,
                });
            }
        }
    }

    async createStory(req, res, next) {
        // const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        // const payload = handleToken.getPayLoad(token);
        // if(req.file) {
        //     req.body.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
        //     await user.findOneAndUpdate({ _id: payload.id }, { 
        //         $set: { 
        //             infoAccount: req.body,
        //             'infoAccount.lastModified': new Date,
        //         },
        //     });
        // }else {
        //     await user.findOneAndUpdate({ _id: payload.id }, { 
        //         $set: { 
        //             'infoAccount.firstName': req.body.firstName,
        //             'infoAccount.lastName': req.body.lastName,
        //             'infoAccount.age': req.body.age,
        //             'infoAccount.gender': req.body.gender,
        //             'infoAccount.lastModified': new Date,
        //         },
        //     });
        // }
        // res.redirect('#');
    }

    async acceptMakeUser(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            await user.findOneAndUpdate({ _id: payload.id }, {
                'infoAccount.typeUser': req.body.changeUser,
            });
        }
        res.json({ isSucess: true });
    }

}

module.exports = new ControllerPrivate;
