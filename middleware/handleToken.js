const jwt = require('jsonwebtoken');

module.exports = new class handle {

    generatorToken(payload) {
        const token = jwt.sign({ id: payload.id }, process.env.CODE_SECRET, {
            expiresIn: 60,
        })
        return token;
    }
    verifyToken(getTokenFormRequest) {
        try {
            const token = getTokenFormRequest.cookies.Authorization.split(' ')[1];
            const payload = jwt.verify(token, process.env.CODE_SERCET);
            if(payload) {
                return payload;
            }
        } catch (error) {
            if(error) {
                return null;
            }
        }
    }

}