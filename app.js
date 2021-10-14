// environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const favicon = require('serve-favicon');

const User = require('./models/user');

const app = express();

const AddTask = require('./controllers/database/addTask');
const DeleteTask = require('./controllers/database/deleteTask');
const RenderHome = require('./controllers/database/renderHome');
const Edit = require('./controllers/database/editTask');
const Register = require('./controllers/authentication/register');
const Login = require('./controllers/authentication/login');
const Logout = require('./controllers/authentication/logout');

// views
app.set("view engine", "ejs");
app.set("views", "views");

// express
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// sessions
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

// passport
app.use(passport.initialize());
app.use(passport.session());

// flash functionality
app.use(function (req, res, next) {
    // if there's a flash message in the session request, make it available in the response
    res.locals.flash = req.session.flash;
    // then delete it
    delete req.session.flash;
    next();
});

// database
mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

// passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.post("/add", AddTask.addTask);

app.post("/delete", DeleteTask.deleteTask);

app.get("/login", Login.getLogin);

app.post("/login", Login.postLogin);

app.get("/logout", Logout.getLogout);

app.get("/register", Register.getRegister);

app.post("/register", Register.postRegister);

app.post("/edit", Edit.postToEdit);

app.post("/update", Edit.updateTask);

app.get("/", RenderHome.renderHome);

app.listen(3000);