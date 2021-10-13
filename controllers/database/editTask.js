const mongoose = require('mongoose');


const Task = require('../../models/task');


const postToEdit = (req, res, next) => {
    console.log(req.body.edit);
    Task.findOne({ _id: req.body.edit })
        .then((task, err) => {
            if (err) {
                // res.send(err);
                console.log("Something not right");
                console.log(err);
            }
            else {
                console.log(task);
                return res.render("edit", { pageTitle: "Edit", loggedIn: false, document: task })
            }
        })
        .catch(err => {
            console.log(err);
        })
};

const updateTask = async (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.body.id);
    const title = req.body.title;
    const date = req.body.date;
    const details = req.body.details;
    console.log(title);
    console.log(date);
    console.log(details);
    console.log(id);
    console.log(typeof (id))
    const update = { title: title, date: date, details: details };
    await Task.findOneAndUpdate({ _id: id }, update, function (err, doc) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("UPDATED")
        }
    });
    res.redirect("/");
};


module.exports = {
    postToEdit: postToEdit,
    updateTask: updateTask
};
