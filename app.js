require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const favicon = require('serve-favicon');
// const passportLocalMongoose = require('passport-local-mongoose');

const User = require('./models/user');


const app = express();


// const Task = require('./models/task');
const AddTask = require('./controllers/database/addTask');
const DeleteTask = require('./controllers/database/deleteTask');
const RenderHome = require('./controllers/database/renderHome');
const Edit = require('./controllers/database/editTask');
const Register = require('./controllers/authentication/register');
const Login = require('./controllers/authentication/login');
const Logout = require('./controllers/authentication/logout');


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
// app.use(express.json());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

// flash functionality
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response
    res.locals.flash = req.session.flash;
    // then delete it
    delete req.session.flash;
    next();
  });

mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/edit", (req, res, next) => {

//     res.render("edit", { pageTitle: "Edit Task" });
// });


app.post("/add", AddTask.addTask);

app.post("/delete", DeleteTask.deleteTask);

app.get("/login", Login.getLogin);

app.get("/logout", Logout.getLogout);

app.get("/register", Register.getRegister);

app.post("/login", Login.postLogin);

app.post("/register", Register.postRegister);

app.post("/edit", Edit.postToEdit);

app.post("/update", Edit.updateTask);
// (req, res, next) => {
    // personName = req.body.name;
    // username = req.body.username;
    // password = req.body.password;
    // console.log(personName);
    // console.log(username);
    // console.log(password);
    // // name:personname, 
    // // User.register({username:username}, password, (err, user) => {
    // User.register(new User({username: username, personName: personName}), password, (err, user) => {
    //     console.log("entered the register middleware")
    //     if(err){
    //         console.log(err);
    //         console.log("went into the error route")
    //         res.redirect("/register");
    //     }else{
    //         console.log("entered the else");
    //         passport.authenticate("local",  function(err, user, info) {
    //             console.log("authenticate");
    //     console.log(err);
    //     console.log(user);
    //     console.log(info);
    //     // console.log(personName);
    //     // user.personName = personName;
    //     // console.log(user);
    //         }) (req, res, next)
    //     };
    // });
// });




app.get("/", RenderHome.renderHome);

app.listen(3000);