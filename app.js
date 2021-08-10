const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true });
const Task = require('./models/task');
const AddTask = require('./controllers/database/addTask');
const DeleteTask = require('./controllers/database/deleteTask');
const RenderHome = require('./controllers/database/renderHome');
const GetRegister = require('./controllers/authentication/register');
const GetLogin = require('./controllers/authentication/login');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/edit", (req, res, next) => {

    res.render("edit", { pageTitle: "Edit Task" });
});


app.post("/add", AddTask.addTask);

app.post("/delete", DeleteTask.deleteTask);

app.get("/login", GetLogin.getLogin);

app.get("/register", GetRegister.getRegister);

// app.post("/login", (req, res, next) => {

// };

app.post("/register", GetRegister.postRegister);



app.get("/", RenderHome.renderHome);

app.listen(3000);