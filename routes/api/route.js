const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/threads', (req, res) => { // shows all threads
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'senbonzakura921',
        database: 'tutorapp'
    });
    const queryString = "SELECT * FROM threads";
    connection.query(queryString, (error, rows, fields) => {
        if (error) { console.log(err); res.sendStatus(500); return } 
        const topics = rows.map((row) => {
            return { topic : row.topic }
        });
        res.json(topics);
    });
});
 
module.exports = router;