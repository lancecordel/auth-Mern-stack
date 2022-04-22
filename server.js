const express = require('express');
const db = require('./db')
const app = express();
const PORT = 5000 || process.env.PORT
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

// Import routes and use
app.use(express.json())
//  main root
app.use("/users", userRoute)
//  authorization route
app.use("/authorize", authRoute)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log('server is running'))