const router = require("express").Router();
const User = require('../models/User');
const { jwtVerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./jwtVerifyToken');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config();

//  Crud operations for user

//  Create user
router.post('/register', async (req, res) =>{
    // assign new user to variable
    const newUser = new User({
        // assign Schema properties, and capture value from form
        username: req.body.username,
        email: req.body.email,
        //  take user inserted password and encrypt
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_PHRASE).toString()
    })
    try{
        // save new user to database
        const savedUser = await newUser.save();
        // show new user data after saved
        res.status(200).json(savedUser);
    } catch(err) {
        // if there is a problem, show error message
        res.status(500).json(err);
    }
})


//  UPDATE with JWT Verification Middleware.  Also See if Token is Admin or NOT
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    //  if password is present
    if(req.body.password){
        //  encrypt password
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_PHRASE).toString();
    }
    try{
        // update user details to a variable
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body },{new: true});
        //  show updated user details
        res.status(200).json(updatedUser);
        
    } catch (err){
        res.status(500).json(err);
    }
})

//  verify Authorization and Delete-----------------------------------------------------------------
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) =>{
    const deleted = await User.findByIdAndDelete(req.params.id);
    if(!deleted){
        res.status(404).json('User Not Found!');
        return;
    }
    res.status(200).json('User Deleted')
} )

//  Need admin permission fo find a user-----------------------------------------------------------
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) =>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json('User Not Found!');
        return;
    }
    res.status(200).json(user)
})

//  FIND ALL USERS-------------------------------------------------------------------------------------
router.get('/find/', verifyTokenAndAdmin, async (req, res) =>{
    try{
        const user = await User.find();
        if(!user){
            res.status(404).json('User Not Found!');
            return;
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json('USER NOT FOUND', err.message)
    }

})

// //  FIND BY USERNAME ------------------------------------------------------------------------
// router.get('/find/name', verifyTokenAndAdmin, async (req, res) =>{
//     try{
//         const user = await User.findOne({username: req.body.username});
//         if(!user){
//             res.status(404).json('User Not Found!');
//             return;
//         }
//         res.status(200).json(user)
//     } catch (err) {
//         res.status(404).json('USER NOT FOUND', err.message)
//     }
// })

module.exports = router;