const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({  
    personName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});



    // ,
    // password: {
    //     type: String,
    //     required: true
    // }
// }


userSchema.plugin(passportLocalMongoose, {selectFields: "username personName"});

module.exports = mongoose.model("User", userSchema);