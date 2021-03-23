const user = require('../modelsController/account.js');
const subSchems = require('../modelsController/subSchems.js');
const handleToken = require('../middleware/handleToken.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const joi = require('joi');
const formidable = require('formidable');
const fs = require('fs/promises');

class ControllerPrivate {

    async profile(req, res, next) {
        const payload = req.body.payload;
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            res.render('profile', {
                data,
                profile: true,
            });
        }
    }
    async accountDetail(req, res, next) {
        const payload = req.body.payload;
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            res.render('profile', {
                data,
                accountDetail: true,
            });
        }
    }

    async updateAccountDetail(req, res, next) {
        const payload = req.body.payload;
        const form = formidable({ 
            multiples: true,
            uploadDir: `${process.env.UPLOADS}\\avatars`
        });
        form.parse(req, async (err, fields, files) => {
            if(files.avatar.size === 0) {
                await fs.rm(files.avatar.path);
            }else {
                await fs.rename(files.avatar.path, `${form.uploadDir}\\${files.avatar.name}`);
                await user.findOneAndUpdate({ _id: payload.id }, { 
                    $set: {
                        'infoAccount.avatar': `${form.uploadDir}\\${files.avatar.name}`,
                        'infoAccount.lastModified': new Date,
                    },
                });
            }
            if (err) {
                next(err);
                return;
            }
            await user.findOneAndUpdate({ _id: payload.id }, { 
                $set: { 
                    'infoAccount.firstName': fields.firstName,
                    'infoAccount.lastName': fields.lastName,
                    'infoAccount.age': fields.age,
                    'infoAccount.gender': fields.gender,
                    'infoAccount.lastModified': new Date,
                },
            });
        });
        res.redirect('#');
    }

    async changePassword(req, res, next) {
        const payload = req.body.payload;
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
            const payload = req.body.payload;
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
        const payload = req.body.payload;
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
        const payload = req.body.payload;
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
        const payload = req.body.payload;
        const form = formidable({ 
            multiples: true,
            uploadDir: `${process.env.UPLOADS}\\coverImage`
        });
        form.parse(req, async (err, fields, files) => {
            // console.log({files, fields: JSON.parse(fields.addStory)})
            const field = JSON.parse(fields.addStory);
            if(files.coverImage.size === 0) {
                await fs.rm(files.avatar.path);
            }else {
                await fs.rename(files.coverImage.path, `${form.uploadDir}\\${files.coverImage.name}`);
            }
            if (err) {
                next(err);
                return;
            }
            await user.findOneAndUpdate({ _id: payload.id }, {
                $push: {
                    storys: Object.assign(field, { coverImage: `${form.uploadDir}\\${files.coverImage.name}` }),
                }
            }).then(function(document) {
                console.log(document)
                res.json({ isSucess: true });
                next();
            })
        })
        // res.redirect('#');
    }

    async deleteStory(req, res, next) {
        const payload = req.body.payload;
        // console.log('Access router delete coures');
        // console.log(req.body.deleteStory)
        if(payload) {
            await user.findOneAndUpdate({ _id: payload.id }, {
                $pull: {
                    'storys': { _id: req.body.deleteStory }
                }
            })
            .then(function() {
                res.json({ isSucess: true });
                next();
            })
        }
    }

    async editStory(req, res, next) {
        const payload = req.body.payload;
        await user.findOne({
            _id: payload.id,
        }).then((profile) => {
            user.storys.find({
                storys: {
                    $elemMatch: {
                        _id: { $eq: req.params.idStory },
                    }
                }
            }).then((value) => {
                console.log(value);
            })
        })
    }

    async acceptMakeUser(req, res, next) {
        const payload = req.body.payload;
        if(payload) {
            await user.findOneAndUpdate({ _id: payload.id }, {
                'infoAccount.typeUser': req.body.changeUser,
            });
        }
        res.json({ isSucess: true });
    }

}

module.exports = new ControllerPrivate;
