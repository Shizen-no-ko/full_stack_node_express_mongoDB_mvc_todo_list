const mongoose = require('mongoose');

const Task = require('../../models/task');

// edit task route
const postToEdit = (req, res, next) => {
    // find task with passed id number
    Task.findOne({ _id: req.body.edit })
        .then((task, err) => {
            if (err) {
                console.log(err);
            }
            // if task exists render edit route passing task document
            else {
                return res.render("edit", { pageTitle: "Edit", loggedIn: false, document: task })
            }
        })
        .catch(err => {
            console.log(err);
        })
};

// update task route
const updateTask = async (req, res, next) => {
    // get passed document id and form field data
    const id = mongoose.Types.ObjectId(req.body.id);
    const title = req.body.title;
    const date = req.body.date;
    const details = req.body.details;
    // set update data
    const update = { title: title, date: date, details: details };
    // update in database
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
