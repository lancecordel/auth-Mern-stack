const router = require("express").Router();
const User = require('../models/User'); // user schema
const CryptoJS = require("crypto-js")   // to encrypt password
const jsonWebToken = require('jsonwebtoken');
const dotenv = require("dotenv");   // to hide important files
const { json } = require("express");
dotenv.config();

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

// User Login
router.post('/login', async(req, res)=>{
    try{
        //  find user, based on unique username
        const user = await User.findOne({ 
            username: req.body.username,
            email: req.body.email
        });

        if(!user){
            //  if username doesn't coincide with email 
            res.status(401).json('incorrect credentials')
            return;     //  if validations fails, exit block to prevent server crash
        }
        // !user && res.status(401).json('Wrong username or password')
        
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
        {expiresIn: "2d"}
        );
        //  destructure user object
        const { password, ...nonPasswordItems } = user._doc;
        
        res.status(200).json({...nonPasswordItems, accessToken});   //  integrate accessToken with others
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;