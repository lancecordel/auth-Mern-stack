const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ProductSchema = new Schema(
    {
        category: {type: String, required: true},
        size: {type: String},
        color: {type: String},
        title: {type: String, required: true},
        description: {type: String, require: true},
        image: {type: String},
        price: {type: Number, required: true},
 
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", ProductSchema)