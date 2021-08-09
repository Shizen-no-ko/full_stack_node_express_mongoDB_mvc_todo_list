const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.addTask = (req, res, next) => {
  title = req.body.title;
  date = req.body.date;
  description = req.body.description;
  const newTask = new Task({ title: title, date: date, description: description });
  newTask.save(function (err, newTask) {
    if (err) return console.error(err);
    console.log("Saved");
    res.redirect("/");
  })
};





