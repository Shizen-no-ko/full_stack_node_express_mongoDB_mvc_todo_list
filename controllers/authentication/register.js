const passport = require('passport');

const User = require('../../models/user');


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// get route for registering
const getRegister = (req, res, next) => {
    res.render("register", { pageTitle: "Register", flash: res.locals.flash, loggedIn: false, listOwner: "" });
};

// post route for registering
const postRegister = async (req, res, next) => {
    // get passed form data
    personName = req.body.name;
    username = req.body.username;
    password = req.body.password;
    try {
        // check if user already exists and if so, redirect with flash message
        const existUsername = await User.findOne({ username: username });
        if (existUsername) {
            // set flash message
            req.session.flash = {
                type: 'failure',
                message: 'This email is already registered. Please try another, or login.'
            };
            return res.redirect("/register");
        };
    } catch (error) {
        console.error(error);
    }
    // if user does not already exist, register in user collection in database
    User.register(new User({ username: username, personName: personName }), password, (err, user) => {
        if (err) {
            res.redirect("/register");
        } else {
            passport.authenticate("local", function (err, user, info) {
                // login user directly after registering and redirect to home
                req.login(user, function (err) {
                    if (err) {
                        console.log(err);
                    };
                });
                res.redirect("/");
            })(req, res, next)
        };
    });
};

module.exports = {
    getRegister: getRegister,
    postRegister: postRegister
};