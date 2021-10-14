const mongoose = require('mongoose');

const Task = require('../../models/task');

exports.deleteTask = (req, res, next) => {
    // get passed document id
    const id = mongoose.Types.ObjectId(req.body.id);
    // delete by id number
    Task.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("DELETED")
        }
    });
    res.redirect("/");
};