const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user');

exports.getLogout = (req, res, next) => {
  t = [];
  if(!req.isAuthenticated()){
    return res.render("index", { pageTitle: "Home", tasks: t, loggedIn: false });
 };
    req.logout();
    res.redirect('/');
  };