const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/user')
const restaurantRoutes = require('./routes/restaurant')
const menuRoutes = require('./routes/menu')
const orderRoutes = require('./routes/order')

app.use(express.json())


app.use("/api/user",userRoutes)
app.use("/api/restaurant",restaurantRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/order",orderRoutes)

mongoose.connect("mongodb+srv://hamza:hamza123@mernapp.unxcpob.mongodb.net/WebApp")
    .then(()=>{
        app.listen(4000,()=>{
            console.log("connected to db and listening on port 4000")
        })
    })
    .catch((error)=>{
        console.log(error)
})