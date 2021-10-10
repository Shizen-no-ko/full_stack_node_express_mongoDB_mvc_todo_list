const mongoose = require('mongoose');

const User = require('../../models/user');


const getLogin = (req, res, next) => {
    res.render("login", { pageTitle: "Login" });
};

const postLogin = (req, res, next) => {
    email = req.body.email;
    password = req.body.password;
    User.findOne({ email: email }, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    console.log(foundUser);
                };
            }else{
                console.log("Not found");
            }
        };
    });
};

module.exports = {
    getLogin: getLogin,
    postLogin: postLogin
};