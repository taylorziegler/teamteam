// SETUP
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD, 
    database: 'tutorapp'
});

function connect() { // connection to database : mySQL
    return pool;
}

// AUTH
const expressValidator = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// THREADS
router.post('/threads/create-topics', (req, res) => { // insert new thread in the database
    const topic = req.body.topic // may need to change ******* based on form
    const queryString = "INSERT INTO threads (topic) VALUES (?)"
    connect().query(queryString, [topic], (error, results, fields) => {
        if (error) {
            console.log("Failed to post topic to database " + error);
            res.sendStatus(500);
            return;
        }
        res.end();
    });
});

router.get("/threads", authenticationMiddleware(), (req, res) => { // shows all threads
    const queryString = "SELECT * FROM threads";
    connect().query(queryString, (error, rows, fields) => {
        if (error) {
            console.log("Failed to fetch all threads " + error);
            res.sendStatus(500);
            return;
        }
        const topics = rows.map((row) => {
            return { topic : row.topic, id : row.id }
        });
        res.json(topics);
    });
});

var id_thread;
router.get('/threads-questions/:id', authenticationMiddleware(), (req, res) => { // get all the questions corresponding the that thread
    const id = req.params.id;
    id_thread = req.params.id;
    const queryString = "SELECT * FROM questions WHERE thread_id = ? ORDER BY likes DESC"; 
    connect().query(queryString, [id], (error, rows, fields) => {
        if (error) {
            console.log("Failed to fetch questions " + error);
            res.sendStatus(500);
            return;
        }
        const questions = rows.map((row) => {
            return {question : row.question, likes : row.likes, id : row.id}
        });
        res.json(questions);
    });
});

router.post('/threads/create-question', (req, res) => { // post question to the database
    const question = req.body.question; // may need to change depends on form
    const curr_thread = id_thread;
    const queryString = "INSERT INTO questions (question, thread_id) VALUES (?, ?)";
    connect().query(queryString, [question, curr_thread], (error, results, fields) => {
        if (error) {
            console.log("Failed to post question to database " + error);
            res.sendStatus(500);
            return;
        }
        res.end();
    });
});

var id_question;
router.get('/threads-answers/:id', authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    id_question = req.params.id;
    const queryString = "SELECT * FROM answers WHERE question_id = ? ORDER BY likes DESC";
    connect().query(queryString, [id], (error, rows, fields) => {
        if (error) {
            console.log("Failed to fetch answers " + error);
            res.sendStatus(500);
            return;
        }
        const questions = rows.map((row) => {
            return {answer : row.answer, likes : row.likes, id : row.id}
        });
        res.json(questions);
    });
});

router.post('/threads/create-answer', (req, res) => {
    const answer = req.body.answer; // may need to change depends on form
    const curr_question = id_question;
    const queryString = "INSERT INTO answers (answer, question_id) VALUES (?, ?)";
    connect().query(queryString, [answer, curr_question], (error, results, fields) => {
        if (error) {
            console.log("Failed to post answer to the database " + error);
            res.sendStatus(500);
            return;
        }
        res.end();
    });
});

// AUTH
router.post('/create-account', (req, res) => {
    // username; email; password & repassword
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('repassword', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('repassword', 'Passwords do not match, please try again.').equals(req.body.password);
    let errors = req.validationErrors();
    if (errors) {
        res.json(errors[0].msg);
    } else {
        const user = req.body.username;
        const email = req.body.email;
        const pass = req.body.password;  
        const queryString = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
        bcrypt.hash(pass, saltRounds, (err, hash) => {
            connect().query(queryString, [user, email, hash], (error, results, fields) => {
            if (error) {
                console.log("Failed to register a new user " + error)
                res.sendStatus(500);
                return;
            }
            const user_id = results.insertId
            req.login(user_id, (error) => {
                if (error) {
                    console.log("Failed to login " + error) 
                    res.sendStatus(500);
                    return;
                }
                res.redirect("threads"); // may need to change
            });
            });
        });
    }
});

passport.serializeUser((user_id, done) => {
    done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
    done(null, user_id);
});

function authenticationMiddleware() {  
	return (req, res, next) => {
	    if (req.isAuthenticated()) return next();
        res.json('Please log in to your account.') // we may need to change this
        res.end();
	}
}

module.exports = router;