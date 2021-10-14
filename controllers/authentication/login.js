const passport = require('passport');
const User = require('../../models/user');

// get route for login
const getLogin = (req, res, next) => {
    res.render("login", { pageTitle: "Login", loggedIn: false });
};

// post route for login
const postLogin = (req, res, next) => {
    // create new user from passed form data
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    // log-in new user
    req.login(user, function (err) {
        if (err) {
            console.log(err)
            res.redirect('/login');
        } else {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login'
            })(req, res, function () {
                console.log('successfully logged in');
                res.redirect('/');
            })
        };
    })
};

module.exports = {
    getLogin: getLogin,
    postLogin: postLogin
};