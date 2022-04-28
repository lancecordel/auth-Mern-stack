// const { del } = require('express/lib/application')
const Product = require('../models/product')
const User = require('../models/user')
const DuplicateUser = require('../models/DuplicateUser')

//  create Product
const createItem = async (req, res) => {
    try {
        const item = await new Product(req.body);
        await item.save()
        return res.status(201).json({
          item,
        }) 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
// create User
const createUser = async (req, res) => {
    try {
        const user = await new User(req.body);
        await user.save()
        return res.status(201).json({
          user,
        }) 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//  NO UNIQUE users TEST
const createDuplicateUser = async (req, res) => {
    try {
        const duplicateuser = await new DuplicateUser(req.body);
        await duplicateuser.save()
        return res.status(201).json({
          duplicateuser,
        }) 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// GET ALL ITEMS
const getAllItems = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json({products})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//  GET SINGLE ITEM BY ID
const getItemById = async (req,res) => {
    try {
        const {id} = req.params
        const item = await Product.findById(id)
        console.log(item)
        if(item){
            return res.status(200).json({item})
        }
        return res.status(404).send('Item with specified ID does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateItem = (req, res) => {
    try {
        const {id} = req.params
        Product.findByIdAndUpdate(id, req.body, { new: true }, (err, item) => {
            if(err){
                res.status(500).send(err)
            }
            if(!item){
                res.status(500).send('Item not found!')
            }
            return res.status(200).json(item)
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

// DELETE ALL USERS
const deleteAllUsers = async (req, res) => {
    try {
        // const {id} = req.params
        const deleted = await DuplicateUser.deleteMany()
        if(deleted){
            return res.status(200).send('All Users Deleted')
        }
        throw new Error('Item Not Found!')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        const deleted = await Product.findByIdAndDelete(id)
        if(deleted){
            return res.status(200).send('Item Deleted')
        }
        throw new Error('Item Not Found!')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createItem,
    createUser,
    createDuplicateUser,
    deleteAllUsers,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
}