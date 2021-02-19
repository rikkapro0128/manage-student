const jwt = require('jsonwebtoken');

module.exports = new class handle {

    generatorToken(payload) {
        const token = jwt.sign({
            id: payload.id,
        }, process.env.CODE_SECRET, {
            expiresIn: parseInt(process.env.MAX_AGE),
        })
        return token;
    }
    verifyToken(token) {
        try {
            if(token) {
                const payload = jwt.verify(token, process.env.CODE_SECRET)
                if(payload) { return true }
            }
        } catch (error) {
            if(error) { return false }
        }
    }

    getPayLoad(token) {
        try {
            if(token) {
                const payload = jwt.verify(token, process.env.CODE_SECRET)
                if(payload) { return payload }
            }
        } catch (error) {
            if(error) { return null }
        }
    }

}