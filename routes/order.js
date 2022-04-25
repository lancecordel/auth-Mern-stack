const router = require("express").Router();
const Order = require('../models/Order');
const { jwtVerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./jwtVerifyToken');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config();

//  Crud operations for Orders

//  Create order
router.post('/', jwtVerifyToken, async (req, res) =>{
    // assign new user to variable
    const newOrder = new Order(req.body)
    try{
        // save new order to database
        const savedOrder = await newOrder.save();
        // show new order data after saved
        res.status(200).json(savedOrder);
    } catch(err) {
        // if there is a problem, show error message
        res.status(500).json(err);
    }
})


//  UPDATE with JWT Verification Middleware.  Also See if user is Admin or NOT
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try{
        // updated order details to a variable
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body },{new: true});
        //  show updated order details
        if(!updateCart) return;
        res.status(200).json({updateOrder});
    }
 catch (err){
        res.status(404).json('ORDER NOT FOUND');
    }
})

//  verify Authorization and Delete-----------------------------------------------------------------
router.delete('/:id', verifyTokenAndAdmin, async (req, res) =>{
    try{
        const deleted = await Order.findByIdAndDelete(req.params.id);
        if(!deleted) return;
        res.status(200).json('Order Deleted')
    } catch(err){
        res.status(404).json("ORDER NOT FOUND")
    }

} )

//  get user Cart  -----------------------------------------------------------
router.get('/find/:userId', verifyTokenAndAdmin, async (req, res) =>{
    try{
        const orders = await Order.find({userId: req.params.id});
        if(!orders) return res.status(404).json('ORDER NOT FOUND');
        res.status(200).json(orders)
     } catch(err) {
         res.status(500).json("Order Not Found");
      }
})

//  FIND PRODUCTS By QUERY Category-------------------------------------------------------------------------------------
router.get('/', verifyTokenAndAdmin, async (req, res) =>{
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get monthly sales
router.get("/sales", verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    //  Month Prior to current month.
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    //  And the Month before that
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try{
        const income = await Order.aggregate([
            //  get any date matching this statement
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                    }
            },
                {
                    //  get properties list above
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                    }
                }
        ]);
        res.status(200).json(income)
    } catch(err) {
        res.status(500).json('There Was a Date error', err.message)
    }
} )

module.exports = router;