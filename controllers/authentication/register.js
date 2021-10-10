// const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const User = require('../../models/user');


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const getRegister = (req, res, next) => {
    res.render("register", { pageTitle: "Register", flash: res.locals.flash });
};


const postRegister = async (req, res, next) => {
    personName = req.body.name;
    username = req.body.username;
    password = req.body.password;
    try {
        const existUsername = await User.findOne({ username: username });
        if (existUsername) {
            console.log("User already exists");

            req.session.flash = {
                type: 'failure',
                message: 'This email is already registered. Please try another, or login.'
              };

             
            return res.redirect("/register");
        };
    } catch (error) {
        console.error(error);
    }



    User.register(new User({ username: username, personName: personName }), password, (err, user) => {
        console.log("entered the register middleware")

        if (err) {
            res.redirect("/register");
        } else {
            passport.authenticate("local", function (err, user, info) {
                console.log("You have been authenticated");

                console.log('user: ' + user.username + " saved.");
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