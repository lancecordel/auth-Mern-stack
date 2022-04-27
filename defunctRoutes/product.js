// const router = require("express").Router();
// const Product = require('../models/Product');
// const { jwtVerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./jwtVerifyToken');
// const CryptoJS = require('crypto-js');
// const dotenv = require('dotenv');
// dotenv.config();

// const createProduct = async (req, res) => {
//     try {
//         const product = await new Product(req.body)
//         await product.save()
//         return res.status(201).json({
//           item,
//         }) 
//     } catch (error) {
//         return res.status(500).json({error: error.message})
//     }
// }

// // const getAllItems = async (req, res) => {
// //     try {
// //         const product = await Product.find()
// //         return res.status(200).json({items})
// //     } catch (error) {
// //         return res.status(500).send(error.message)
// //     }
// // }

// // const getItemById = async (req,res) => {
// //     try {
// //         const {id} = req.params
// //         const item = await Item.findById(id)
// //         console.log(item)
// //         if(item){
// //             return res.status(200).json({item})
// //         }
// //         return res.status(404).send('Item with specified ID does not exist')
// //     } catch (error) {
// //         return res.status(500).send(error.message)
// //     }
// // }

// // const updateItem = (req, res) => {
// //     try {
// //         const {id} = req.params
// //         Item.findByIdAndUpdate(id, req.body, { new: true }, (err, item) => {
// //             if(err){
// //                 res.status(500).send(err)
// //             }
// //             if(!item){
// //                 res.status(500).send('Item not found!')
// //             }
// //             return res.status(200).json(item)
// //         })
// //     } catch (error) {
// //         return res.status(500).send(error.message)
// //     }
// // }

// // const deleteItem = async (req, res) => {
// //     try {
// //         const {id} = req.params
// //         const deleted = await Item.findByIdAndDelete(id)
// //         if(deleted){
// //             return res.status(200).send('Item Deleted')
// //         }
// //         throw new Error('Item Not Found!')
// //     } catch (error) {
// //         return res.status(500).send(error.message)
// //     }
// // }

// module.exports = {
//     createItem,
//     // getAllItems,
//     // getItemById,
//     // updateItem,
//     // deleteItem
// }


// ////............................JWT AUTHORIZATION.....................................
// // //  Crud operations for products

// // //  Create product
// // router.post('/admin', async (req, res) =>{
// //     // assign new user to variable
// //     const newProduct = new Product(req.body)
// //     try{
// //         // save new product to database
// //         const savedProduct = await newProduct.save();
// //         // show new user data after saved
// //         res.status(200).json(savedProduct);
// //     } catch(err) {
// //         // if there is a problem, show error message
// //         res.status(500).json(err);
// //     }
// // })


// // //  UPDATE with JWT Verification Middleware.  Also See if user is Admin or NOT
// // router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
// //     try{
// //         // updated product details to a variable
// //         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body },{new: true});
// //         //  show updated product details
// //         if(!updatedProduct) return;
// //         res.status(200).json({updatedProduct});
// //     }
// //  catch (err){
// //         res.status(404).json('PRODUCT NOT FOUND');
// //     }
// // })

// // //  verify Authorization and Delete-----------------------------------------------------------------
// // router.delete('/:id', verifyTokenAndAdmin, async (req, res) =>{
// //     try{
// //         const deleted = await Product.findByIdAndDelete(req.params.id);
// //         if(!deleted) return;
// //         res.status(200).json('Product Deleted')
// //     } catch(err){
// //         res.status(404).json("ITEM NOT FOUND")
// //     }

// // } )

// // //  find a Product by id -----------------------------------------------------------
// // router.get('/find/:id', async (req, res) =>{
// //     try{
// //         const product = await Product.findById(req.params.id);
// //         if(!product) return res.status(404).json('PRODUCT NOT FOUND');
// //         res.status(200).json(product)
// //      } catch(err) {
// //          res.status(500).json("Product Not Found");
// //       }
// // })

// // //  FIND PRODUCTS By QUERY Category-------------------------------------------------------------------------------------
// // router.get('/', async (req, res) =>{
// //     const queryCategory = req.query.category;
// //     try{
// //         let products;
// //         if(queryCategory){
// //             products = await Product.find({ category: { $in: [ queryCategory ] } })
// //         } else {
// //             products = await Product.find()
// //         }
// //         res.status(200).json(products)
// //     } catch (err) {
// //         res.status(404).json('USER NOT FOUND', err.message)
// //     }
// // })

// // module.exports = router;