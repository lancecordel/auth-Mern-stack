const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ProductSchema = new Schema(
    {
        category: {type: String},
        size: {type: String},
        // color: {type: String},
        // title: {type: Array},
        // description: {type: String},
        // image: {type: String},
        // price: {type: Number},
 
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", ProductSchema)