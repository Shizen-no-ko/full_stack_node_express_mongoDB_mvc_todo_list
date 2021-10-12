const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.renderHome = (req, res, next) => {
  let t = [];
  if(!req.isAuthenticated()){
     return res.render("index", { pageTitle: "Home", tasks: t, loggedIn: false });
  };
  Task.find({username: req.user.username})
    .then((result) => {
      t = result;
      // sort list of tasks by date
      t.sort((a, b) => new Date(a.date) - new Date(b.date));
      // t.forEach((task) => console.log(task.date));
    })
    .then(() => res.render("index", { pageTitle: "Home", tasks: t, loggedIn: true }))
    .catch(err => {
      console.log(err);
    })
};



