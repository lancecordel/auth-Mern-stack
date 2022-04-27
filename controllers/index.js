// const { del } = require('express/lib/application')
const Item = require('../models/Product')

const createItem = async (req, res) => {
    try {
        const item = await new Product(req.body)
        await item.save()
        return res.status(201).json({
          item,
        }) 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllItems = async (req, res) => {
    try {
        const items = await Product.find()
        return res.status(200).json({items})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

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
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
}