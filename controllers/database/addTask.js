const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.addTask = (req, res, next) => {
  // get passed form field data
  const title = req.body.title;
  const date = req.body.date;
  const details = req.body.details;
  // if user is logged-in create new task and save in database
  if (req.isAuthenticated()) {
    const newTask = new Task({ title: title, date: date, details: details, username: req.user.username });
    newTask.save(function (err, newTask) {
      if (err) return console.error(err);
      res.redirect("/");
    });
    // if user not logged-in create flash message and redirect to home
  } else {
    req.session.flash = {
      type: 'failure',
      message: 'Please login or register in order to add your tasks.'
    };
    res.redirect("/");
  };
};