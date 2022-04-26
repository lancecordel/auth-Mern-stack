const router = require("express").Router();
const User = require('../models/User'); // user schema
const CryptoJS = require("crypto-js")   // to encrypt password
const jsonWebToken = require('jsonwebtoken');
const dotenv = require("dotenv");   // to hide important files
// const { json } = require("express");
dotenv.config();

// User Login
router.post('/login', async(req, res)=>{
    try{
        //  find user, based on unique username
        const user = await User.findOne({ 
            username: req.body.username,
            email: req.body.email
        });
        console.log(user)

        if(!user){
            //  if username doesn't coincide with email 
            res.status(401).json('incorrect credentials')
            return;     //  if validations fails, exit block to prevent server crash
        }
        
        //  Decrypt with phrase saved into the ENV file
        const encryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_PHRASE);
        const DecryptedPassword = encryptedPassword.toString(CryptoJS.enc.Utf8);

        if( DecryptedPassword !== req.body.password ){
            res.status(401).json('You Entered the wrong Password!');
            return;  // after validation fails, exit block to prevent server crash
        }
        //
        const accessToken = jsonWebToken.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_KEY,
        {expiresIn: "3d"}
        );
        //  destructure user object
        const { password, ...nonPasswordItems } = user._doc;
        
        res.status(200).json({...nonPasswordItems, accessToken});   //  integrate accessToken with others
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;