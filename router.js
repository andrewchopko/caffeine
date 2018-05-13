const passport = require('passport');
const Authentication = require('./controllers/authentication');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = app => {
    app.get("/", (req, res) => {
        res.send({ message: 'ok' });
    });

    app.post("/signup", Authentication.signup);
}