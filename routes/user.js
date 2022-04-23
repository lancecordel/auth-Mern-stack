const router = require("express").Router();
const User = require('../models/User');
const { jwtVerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./jwtVerifyToken');
const CryptoJS = require('crypto-js');

//  Crud operations for user

//  UPDATE with JWT Verification Middleware.  Also See if Token is Admin or NOT
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    //  if password is present
    if(req.body.password){
        //  encrypt password
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.CRYPTO_PHRASE
        ).toString();
    }
    try{
        // update user details to a variable
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body },{ new: true } );
        //  show updated user details
        res.status(200).json(updatedUser);
        
    } catch (err){
        res.status(500).json(err);
    }
})

//  Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) =>{
    const deleted = await User.findByIdAndDelete(req.params.id);
    if(!deleted){
        res.status(404).json('User Not Found!');
        return;
    }
    res.status(200).json('User Deleted')
} )

//  Need admin permission fo find a user
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) =>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json('User Not Found!');
        return;
    }
    res.status(200).json(user)
})

module.exports = router;