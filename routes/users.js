const express = require('express');
const router = express.Router();
const userInfo = require('../models/Users');

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

router.get('/user/:id', async (req, res) => { // i feel like i need to look back on this
    try {
        const specificUser = await userInfo.findById(req.params.id);
        res.json(specificUser);
    } catch (error) {
        res.json({ message: error })
    }
});

router.post('/create-question', (req, res) => { // write question to database // * all users can modify the comments (answers)
    res.send('create question here');
});

router.get('/questions/:id', (req, res) => { // review this
    res.send('view questions');
});

module.exports = router;