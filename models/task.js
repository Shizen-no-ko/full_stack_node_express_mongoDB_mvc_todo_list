const mongoose = require('mongoose');

// const Schema = mongoose.Schema();

const taskSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
    date: String,
    description: String
});

module.exports = mongoose.model("Task", taskSchema);