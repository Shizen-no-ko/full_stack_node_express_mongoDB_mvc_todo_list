const mongoose = require('mongoose');

const Task = require('../../models/task');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

class AddTask{
    constructor(title, date, description){
this.title = title;
this.date = date;
this.description = description;
this.db = mongoose.connection;
    };
    save(){
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function() {
      console.log("Connected")
    });
    const newTask = new Task({ title: this.title, date: this.date, description: this.description });
    console.log(newTask.title);
    newTask.save(function (err, newTask) {
        if (err) return console.error(err);
        console.log("Saved")
        mongoose.connection.close();
      }); 
    };
};

module.exports = AddTask;




