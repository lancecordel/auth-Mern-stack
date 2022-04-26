const express = require('express');
const db = require('./db')
const app = express();
const PORT = 300 || process.env.PORT
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const prodRoute = require('./routes/product')
const cors = require('cors');
app.use(cors());
// const orderRoute = require('./routes/order')
// const cartRoute = require('./routes/cart')

// Import routes and use
app.use(express.json())

//  main root
app.use("/users", userRoute)

//  authorization route
app.use("/authorize", authRoute)

app.use("/products", prodRoute)
// app.use("/carts", cartRoute)
// app.use("/orders", orderRoute)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log('server is running'))