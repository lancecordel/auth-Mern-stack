const router = require("express").Router();
const Cart = require('../models/Cart');
const { jwtVerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./jwtVerifyToken');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config();

//  Crud operations for cart

//  Create Cart
router.post('/', jwtVerifyToken, async (req, res) =>{
    // assign new user to variable
    const newCart = new Cart(req.body)
    try{
        // save new Cart to database
        const savedCart = await newCart.save();
        // show new user data after saved
        res.status(200).json(savedCart);
    } catch(err) {
        // if there is a problem, show error message
        res.status(500).json(err);
    }
})


//  UPDATE with JWT Verification Middleware.  Also See if user is Admin or NOT
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try{
        // updated cart details to a variable
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body },{new: true});
        //  show updated product details
        if(!updateCart) return;
        res.status(200).json({updateCart});
    }
 catch (err){
        res.status(404).json('CART NOT FOUND');
    }
})

//  verify Authorization and Delete-----------------------------------------------------------------
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) =>{
    try{
        const deleted = await Cart.findByIdAndDelete(req.params.id);
        if(!deleted) return;
        res.status(200).json('Product Deleted')
    } catch(err){
        res.status(404).json("ITEM NOT FOUND")
    }

} )

//  get user Cart  -----------------------------------------------------------
router.get('/find/:userId', async (req, res) =>{
    try{
        const cart = await Cart.findOne({userId: req.params.id});
        if(!cart) return res.status(404).json('CART NOT FOUND');
        res.status(200).json(cart)
     } catch(err) {
         res.status(500).json("Cart Not Found");
      }
})

//  FIND CART ADMIN ONLY-------------------------------------------------------------------------------------
router.get('/', verifyTokenAndAdmin, async (req, res) =>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;