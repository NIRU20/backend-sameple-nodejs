require('express-async-errors')

const Filter=require("../routes/filter")
const extras=require("../routes/extras")
const userDetails=require("../routes/Userdetails")
const Kids=require("../routes/kids")
const Wishlist=require("../routes/wishlist")
const User=require("../routes/User")
const Cart=require("../routes/cart")
const Orders=require("../routes/orders")
const payment=require("../routes/payment")
const asyncMiddleware=require("../Middlewares/async")
const error=require("../Middlewares/error")
const winston=require('winston')

const routes=(app)=>{
    app.use("/filter",Filter)
    app.use("/",extras)
    app.use("/",User)
    app.use("/",Cart)
    app.use("/",Orders)
    app.use("/payment",payment)
    app.use("/kids",Kids)
    app.use("/userDetails",userDetails)
    app.use("/wishlist",Wishlist)

    app.use(error)
}

module.exports=routes