const router = require("express").Router();
const Product = require('../models/Product');
const { jwtVerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./jwtVerifyToken');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config();

//  Crud operations for products

//  Create product
router.post('/', verifyTokenAndAdmin, async (req, res) =>{
    // assign new user to variable
    const newProduct = new Product(req.body)
    try{
        // save new product to database
        const savedProduct = await newProduct.save();
        // show new user data after saved
        res.status(200).json(savedProduct);
    } catch(err) {
        // if there is a problem, show error message
        res.status(500).json(err);
    }
})


//  UPDATE with JWT Verification Middleware.  Also See if user is Admin or NOT
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try{
        // updated product details to a variable
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body },{new: true});
        //  show updated product details
        if(!updatedProduct) return;
        res.status(200).json({updatedProduct});
    }
 catch (err){
        res.status(404).json('PRODUCT NOT FOUND');
    }
})

//  verify Authorization and Delete-----------------------------------------------------------------
router.delete('/:id', verifyTokenAndAdmin, async (req, res) =>{
    try{
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if(!deleted) return;
        res.status(200).json('Product Deleted')
    } catch(err){
        res.status(404).json("ITEM NOT FOUND")
    }

} )

//  find a Product by id -----------------------------------------------------------
router.get('/find/:id', async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json('PRODUCT NOT FOUND');
        res.status(200).json(product)
     } catch(err) {
         res.status(500).json("Product Not Found");
      }
})

//  FIND PRODUCTS By QUERY Category-------------------------------------------------------------------------------------
router.get('/', async (req, res) =>{
    const queryCategory = req.query.category;
    try{
        let products;
        if(queryCategory){
            products = await Product.find({ category: { $in: [ queryCategory ] } })
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (err) {
        res.status(404).json('USER NOT FOUND', err.message)
    }
})

module.exports = router;