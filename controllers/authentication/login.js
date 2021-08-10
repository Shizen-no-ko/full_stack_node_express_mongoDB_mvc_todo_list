const mongoose = require('mongoose');

// const Task = require('../../models/task');


exports.getLogin = (req, res, next) => {
    res.render("login", { pageTitle: "Login"});
};