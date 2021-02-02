const jwt = require('jsonwebtoken');

module.exports = new class handle {

    generatorToken(payload) {
        const token = jwt.sign({
            id: payload._id,
            fullName: payload.fullName,
        }, process.env.CODE_SECRET, {
            expiresIn: 60,
        })
        return token;
    }
    verifyToken(getTokenFormRequest) {
        try {
            const token = getTokenFormRequest.cookies.Authorization.split(' ')[1];
            const payload = jwt.verify(token, process.env.CODE_SECRET);
            if(payload) {
                return true; // token is valid
            }
        } catch (error) {
            if(error) {
                return false; // token is invalid
            }
        }
    }

}