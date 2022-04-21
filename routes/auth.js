const router = require("express").Router();
const User = require('../models/User');

router.post('/register', async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(500).json(err);
    }
})

// router.get("/usertest", (req, res) =>{
//     res.send("user test is successfull")
// })

// router.post('/userposttest', (req, res)=>{
//     const username = req.body.username;
//     res.send('Hello ' + username)
//     console.log(username)
// })

module.exports = router;