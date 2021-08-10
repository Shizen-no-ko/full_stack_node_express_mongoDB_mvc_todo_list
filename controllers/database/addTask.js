const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.addTask = (req, res, next) => {
  title = req.body.title;
  date = req.body.date;
  details = req.body.details;
  const newTask = new Task({ title: title, date: date, details: details });
  newTask.save(function (err, newTask) {
    if (err) return console.error(err);
    res.redirect("/");
  });
};





