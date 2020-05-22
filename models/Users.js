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

const userQuestionSchema = mongoose.Schema({ // when user posts a question 
    question: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: Number
})

const userAnswerSchema = mongoose.Schema({ // when user clicks on question, can see all the answers
    answer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: Number
})

const userThreadsSchema = mongoose.Schema({ // when user creates a thread
    title: {
        type: String,
        required: true
    },
    likes: Number
})

// exporting schemas
module.exports = mongoose.model('users', userInfoSchema);
module.exports = mongoose.model('answers', userAnswerSchema);
module.exports = mongoose.model('questions', userQuestionSchema);
module.exports = mongoose.model('threads', userThreadsSchema);