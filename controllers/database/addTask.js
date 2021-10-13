const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.addTask = (req, res, next) => {
 const title = req.body.title;
 const date = req.body.date;
  const details = req.body.details;
  if (req.isAuthenticated()){
    console.log('req is authenticated');
    console.log(req.user.username);
    const newTask = new Task({ title: title, date: date, details: details, username: req.user.username });
    newTask.save(function (err, newTask) {
      if (err) return console.error(err);
      res.redirect("/");
    });
  } else {
    console.log('not authenticated, therefore no task added');
    req.session.flash = {
      type: 'failure',
      message: 'Please login or register in order to add your tasks.'
    };
    res.redirect("/");
  };
  
};





