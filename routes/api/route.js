const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'senbonzakura921',
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

router.get('/threads-questions/:id', (req, res) => { // get all the questions corresponding the that thread
    const id = req.params.id;
    const queryString = "SELECT * FROM questions WHERE thread_id = ?"; 
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

router.get('/threads-answers/:id', (req, res) => {
    const id = req.params.id;
    const queryString = "SELECT * FROM answers WHERE question_id = ?";
    connect().query(queryString, [id], (error, rows, fields) => {
        if (error) {
            console.log("Failed to fetch answers" + error);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
});

module.exports = router;