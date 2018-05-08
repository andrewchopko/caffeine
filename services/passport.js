const passport = require('passport');
const User = require('../models/user');
const key = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Local Strategy

const localOpts = { usernameField: 'email' };
const localStrategy = new LocalStrategy(localOpts, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if(err) { return done(err); }
        if(!user) { return done(null, false); }

        user.comparePassword(password, (err, isMatch) => {
            if(err) { return done(err); }
            if(!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});

//JWT Strategy

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: key.secret
}
const jwtStrategy = new JwtStrategy(jwtOpts, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if(err) { return done(err); }
        user ? done(null, user) : done(null, false);
    });
});

passport.use(localStrategy);
passport.use(jwtStrategy);