const router = require("express").Router();
const User = require('../models/User');

router.post('/register',(req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save();
})

router.get('/:id', async(req, res)=>{
    const {id} = req.params;
    const user = await User.findById(id)
    console.log(id)
    if(user){return res.status(200).json({user})
}
throw new Error('item not found')
}
)

// router.get("/usertest", (req, res) =>{
//     res.send("user test is successfull")
// })

// router.post('/userposttest', (req, res)=>{
//     const username = req.body.username;
//     res.send('Hello ' + username)
//     console.log(username)
// })

module.exports = router;