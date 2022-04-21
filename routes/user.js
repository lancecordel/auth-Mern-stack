const router = require("express").Router();
const User = require('../models/User');

//  Crud operations for user
//  Find user by Id
router.get('/:id', async(req, res)=>{
    const {id} = req.params;
    const user = await User.findById(id)
    console.log(id)
    if(user) return res.status(200).json({user})
    throw new Error('item not found')
    }
)

//  Delete user by id
router.delete('/:id', async(req, res)=>{
    const {id} = req.params;
    const deleted = await User.findByIdAndDelete(id)
    console.log(id)
    if(deleted){return res.status(200).send('User Deleted')
}
throw new Error('item not found')
}
)

// router.get('/usertest', (req, res) =>{
//     res.send("user test is successfull")
// })

// router.post('/userposttest', (req, res)=>{
//     const username = req.body.username;
//     res.send('Hello ' + username)
//     console.log(username)
// })

//  export routes to server.js
module.exports = router;