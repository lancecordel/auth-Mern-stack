const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const Schema  = mongoose.Schema;

const UserSchema = new Schema(
    {
        // change back to unique: true
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    },
    // {
    //     typeKey: '$type'
    // }
);

module.exports = mongoose.model("User", UserSchema)

