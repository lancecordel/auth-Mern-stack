const router = require("express").Router();
const User = require('../models/User'); // user schema
const CryptoJS = require("crypto-js")   // to encrypt password
const dotenv = require("dotenv");   // to hide important files
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
            return; 
        }
        // !user && res.status(401).json('Wrong username or password')
        
        //  Decrypt with phrase saved into the ENV file
        const encryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_PHRASE);
        const password = encryptedPassword.toString(CryptoJS.enc.Utf8);
        if( password !== req.body.password ){
            res.status(401).json('You Entered the wrong Password!');
            return;
        }
        // password !== req.body.password && res.status(401).json('You Entered the wrong Password!');
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;