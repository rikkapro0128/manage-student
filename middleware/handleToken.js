const jwt = require('jsonwebtoken');

module.exports = new class handle {

    generatorToken(payload) {
        const token = jwt.sign({ id: payload.id }, process.env.CODE_SERCET, {
            expiresIn: 60,
        })
        return token;
    }

}