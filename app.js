const express = require('express');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res, next) => {
    res.render("index", {pageTitle: "Home" });
});

app.listen(3000);