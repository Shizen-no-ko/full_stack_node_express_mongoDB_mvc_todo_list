const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.renderHome = (req, res, next) => {
  let t = [];
  if(!req.isAuthenticated()){
     return res.render("index", { pageTitle: "Home", tasks: t });
  };
  Task.find({username: req.user.username})
    .then((result) => {
      t = result;
    })
    .then(() => res.render("index", { pageTitle: "Home", tasks: t }))
    .catch(err => {
      console.log(err);
    })
};



