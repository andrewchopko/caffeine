const User = require('../models/user');
const jwt = require('jwt-simple');
const key = require('../config'); // Add config.js for secret keys

const generateToken = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, key.secret);
}

exports.signin = (req, res, next) => {
    res.send({ token: generateToken(req.user) });
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) { return res.status(422).send("Please, provide email and password!") }

    console.log("we are here");

    // const user = new User({
    //     email: email,
    //     password: password
    // });
    // console.log(user);
    // user.save(err => {
    //     if(err) { return next(err); }
    //     console.log(user);
    //     res.json({ token: generateToken(user) });
    // });

    User.findOne({ email: email }, (err, existingUser) => {
        console.log("in user model before error");
        if(err) { return next(err); }
        console.log("in user model after error");

        if(existingUser) { return res.status(422).send("Email in use!"); }
        console.log("in user model after existing user");

        const user = new User({
            email: email,
            password: password
        });
        console.log(user);
        user.save(err => {
            if(err) { return next(err); }
            console.log(user);
            res.json({ token: generateToken(user) });
        });
    });
}
