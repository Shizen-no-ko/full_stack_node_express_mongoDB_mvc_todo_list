const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.renderHome = (req, res, next) => {
  if(req.isAuthenticated()){
    console.log("Authenticated");
  };
  let t = [];
  Task.find({})
    .then((result) => {
      t = result;
    })
    .then(() => res.render("index", { pageTitle: "Home", tasks: t }))
    .catch(err => {
      console.log(err);
    })
};



