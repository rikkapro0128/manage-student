const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const accountStudent = require('.././modelsController/accountStudent');

passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.CODE_SERCET,
},async (payload, done) => {
    try {
        await accountStudent.findOne({ _id: payload.id })
            .then(async (user) => {
                done(null, user);
            })
    } catch (error) {
        done(error, false);
    }
}))