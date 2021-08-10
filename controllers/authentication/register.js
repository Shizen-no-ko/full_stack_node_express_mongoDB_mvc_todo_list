const mongoose = require('mongoose');

const User = require('../../models/user');


const getRegister = (req, res, next) => {
    res.render("register", { pageTitle: "Register"});
};


const postRegister = (req, res, next) => {
    username = req.body.name;
    email = req.body.email;
    password = req.body.password;
    const newUser = new User({
        username: username,
        email: email,
        password: password
    });
    newUser.save(function (err, newUser) {
        if (err) return console.error(err);
        res.redirect("/");
      });
};

module.exports = {
    getRegister: getRegister,
    postRegister: postRegister
};