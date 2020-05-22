const mongoose = require('mongoose');

const userThreadsSchema = mongoose.Schema({ // when user creates a thread
    title: {
        type: String,
        required: true
    },
    likes: Number
})

module.exports = mongoose.model('threads', userThreadsSchema);