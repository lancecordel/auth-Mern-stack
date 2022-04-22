const router = require("express").Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv");
dotenv.config();

//  Create user
router.post('/register', async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //  encrypt password with crypto
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_PHRASE).toString()
    })
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(500).json(err);
    }
})

// User Login
router.post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({ username: req.body.username });
        if(!user){
            res.status(401).json('Wrong username or password')
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