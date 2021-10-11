const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user');



const getLogin = (req, res, next) => {
    res.render("login", { pageTitle: "Login", loggedIn: false });
};

const postLogin = (req, res, next) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err)
            res.redirect('/login');
        } else {
            passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login' }) (req, res, function(){
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