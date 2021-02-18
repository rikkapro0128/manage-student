const user = require('../modelsController/accountStudent.js');
const handleToken = require('../middleware/handleToken.js')

class ControllerPrivate {

    async profile(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ fullName: payload.fullName });
            res.render('profile', {
                data,
            });
        }
    }
    async accountDetail(req, res, next) {
        const token = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : '';
        const payload = handleToken.getPayLoad(token);
        if(payload) {
            const data = await user.findOne({ fullName: payload.fullName });
            res.render('account-detail', {
                data,
            });
        }
    }

    updateAccountDetail(req, res, next) {
        console.log(req.body);
        next();
    }

}

module.exports = new ControllerPrivate;