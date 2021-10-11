const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user');

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
  };