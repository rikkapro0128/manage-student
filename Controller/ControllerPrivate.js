const user = require('../modelsController/account.js');
const handleToken = require('../middleware/handleToken.js')

class ControllerPrivate {

    async profile(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            res.render('profile', {
                data,
            });
        }
    }
    async accountDetail(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ _id: payload.id });
            res.render('account-detail', {
                data,
            });
        }
    }

    async updateAccountDetail(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        await user.findOneAndUpdate({ _id: payload.id }, { infoAccount: req.body });
            // .then((value, reason) => {
            //     console.log(value);
            //     console.log(reason);
            // })
        res.redirect('/private/account-detail');
    }

}

module.exports = new ControllerPrivate;