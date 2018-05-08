const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = app => {
    app.get("/", (req, res) => {
        res.send({ message: 'ok' });
    });
}