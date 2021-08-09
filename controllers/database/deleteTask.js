const mongoose = require('mongoose');


const Task = require('../../models/task');

exports.deleteTask = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.body.id);
    console.log(id);
    console.log(typeof (id))
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