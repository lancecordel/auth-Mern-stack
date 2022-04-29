const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL).
then(()=>console.log(`Successfully Connected to MongoDB `)).catch((err) => console.log(err))

const db = mongoose.connection;

module.exports = db;

