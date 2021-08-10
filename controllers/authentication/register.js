const mongoose = require('mongoose');

// const Task = require('../../models/task');


exports.getRegister = (req, res, next) => {
    res.render("register", { pageTitle: "Register"});
};