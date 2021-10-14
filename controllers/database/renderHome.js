const mongoose = require('mongoose');

const Task = require('../../models/task');


exports.renderHome = (req, res, next) => {
  let t = [];
  // redirect to home if not logged in before trying to render list
  if (!req.isAuthenticated()) {
    return res.render("index", { pageTitle: "Home", tasks: t, loggedIn: false });
  };
  // find tasks created by logged-in user
  Task.find({ username: req.user.username })
    .then((result) => {
      t = result;
      // sort list of tasks by date
      t.sort((a, b) => new Date(a.date) - new Date(b.date));
    })
    // render homepage with task list
    .then(() => res.render("index", { pageTitle: "Home", tasks: t, loggedIn: true }))
    .catch(err => {
      console.log(err);
    })
};