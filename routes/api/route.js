const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'process.env.PASSWORD', 
    database: 'tutorapp'
});

function connect() { // connection to database : mySQL
    return pool;
}

router.post('/threads/create-topics', (req, res) => { // insert new thread in the database
    const topic = req.body.topic // may need to change ******* based on form
    const queryString = "INSERT INTO threads (topic) VALUES (?)"
    connect().query(queryString, [topic], (error, results, fields) => {
        if (error) {
            console.log("Failed to post topic to database" + error);
            res.sendStatus(500);
            return;
        }
        res.end();
    });
});

router.get('/threads', (req, res) => { // shows all threads
    const queryString = "SELECT * FROM threads";
    connect().query(queryString, (error, rows, fields) => {
        if (error) {
            console.log("Failed to fetch all threads" + error);
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
router.get('/threads-questions/:id', (req, res) => { // get all the questions corresponding the that thread
    const id = req.params.id;
    id_thread = req.params.id;
    const queryString = "SELECT * FROM questions WHERE thread_id = ? ORDER BY likes DESC"; 
    connect().query(queryString, [id], (error, rows, fields) => {
        if (error) {
            console.log("Failed to fetch questions" + error);
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
    const question = req.body.question;
    const curr_thread = id_thread;
    const queryString = "INSERT INTO questions (question, thread_id) VALUES (?, ?)";
    connect().query(queryString, [question, curr_thread], (error, results, fields) => {
        if (error) {
            console.log("Failed to post question to database" + error);
            res.sendStatus(500);
            return;
        }
        res.end();
    });
});

var id_question;
router.get('/threads-answers/:id', (req, res) => {
    const id = req.params.id;
    id_question = req.params.id;
    const queryString = "SELECT * FROM answers WHERE question_id = ? ORDER BY likes DESC";
    connect().query(queryString, [id], (error, rows, fields) => {
        if (error) {
            console.log("Failed to fetch answers" + error);
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
    const answer = req.body.answer;
    const curr_question = id_question;
    const queryString = "INSERT INTO answers (answer, question_id) VALUES (?, ?)";
    connect().query(queryString, [answer, curr_question], (error, results, fields) => {
        if (error) {
            console.log("Failed to post answer to the database" + error);
            res.sendStatus(500);
            return;
        }
        res.end();
    });
});

module.exports = router;