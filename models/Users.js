const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({ // when /:id into user display this info
    name: { // required 
        type: String,
        required: true
    },
    age: { // required 
        type: Number,
        required: true
    },
    interests: String, // optional
    giveHelp: String, // optional
    needHelp: String // optional
})

// exporting schemas
module.exports = mongoose.model('users', userInfoSchema);
