const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.addTask = (req, res, next) => {
  title = req.body.title;
  date = req.body.date;
  details = req.body.details;
  if (req.isAuthenticated()){
    console.log('req is authenticated');
    const newTask = new Task({ title: title, date: date, details: details });
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





