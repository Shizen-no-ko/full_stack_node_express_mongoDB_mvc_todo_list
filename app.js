const express = require('express');

const app = express();

const AddTask = require('./controllers/database/addTask');


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + '/public'));

const task = new AddTask('bananas', '2021-8-4', "la la la la la");
task.save();

app.get("/edit", (req, res, next) => {
    res.render("edit", {pageTitle: "Edit Task" });
});

app.get("/", (req, res, next) => {
    res.render("index", {pageTitle: "Home" });
});

app.listen(3000);