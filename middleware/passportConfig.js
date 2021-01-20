const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const accountStudent = require('.././modelsController/accountStudent');

passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.CODE_SECRET,
},async (payload, done) => {
    console.log(payload)
    try {
        await accountStudent.findOne({ _id: payload.id })
            .then(async (user) => {
                done(null, user);
            })
    } catch (error) {
        done(error, false);
    }
}))

passport.use(new GoogleStrategy({
        clientID: '288598844601-rhoih63mr1i07kg44bsu109357n4p977.apps.googleusercontent.com',
        clientSecret: '8sGSnfuFY1AJhqOTcEsrLDiU',
        callbackURL: '/auth/google/callback',
    },
    function(token, tokenSecret, profile, done) {
        try {
            console.log(profile);
            done(null, profile);
        } catch (error) {
            done(error, false);
        }
    }
))