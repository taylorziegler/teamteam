const express = require('express');
const router = express.Router();
const userInfo = require('../models/Users');
const threads = require('../models/Threads');

router.get('/homepage', (req, res) => { // something with oauth
    res.send('landing page'); 
});

router.post('/user-traits', async (req, res) => { // writing user in db (name, age, ....)
    const user = new userInfo({
        name: req.body.name,
        age: req.body.age,
        interests: req.body.interests,
        giveHelp: req.body.giveHelp,
        needHelp: req.body.needHelp
    });
    try {
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/user/:id', async (req, res) => { // show specific user
    try {
        const specificUser = await userInfo.findById(req.params.id);
        res.json(specificUser);
    } catch (error) {
        res.json({ message: error })
    }
});

router.post('/create-thread', async (req, res) => { // writing new threads in db
    const newThread = new threads({
        title: req.body.title,
        likes: req.body.likes
    })
    try {
        const saveThread = await newThread.save();
        res.json(saveThread);
    } catch (error) {
        res.json({ message: error })
    }
});

router.get('/threads', async (req, res) => { // shows all threads 
    try {
        const allThreads = await threads.find();
        res.json(allThreads);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;