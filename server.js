const express = require('express');
const db = require('./db')
const app = express();
const PORT = 5000 || process.env.PORT

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



app.listen(PORT, () => console.log('server is running'))