const {
    get_order,
    post_order,
    view_orders,
    view_filter_new,
    getallorders
}=require("../controllers/orders")

const express=require("express")
const auth=require("../Middlewares/auth")
const app = express.Router();

//place order
app.get("/order",auth,async(req,res) => await get_order(req,res))
app.post("/order",async(req,res)=>await post_order(req,res))

//view orders
app.get("/view-orders",async(req,res)=>await view_orders(req,res))
//view orders-filter-status('New','Packed','Shipped','Delivered')
app.get("/view-filter-new/:status",async(req,res)=>await view_filter_new(req,res))

app.get('/getAllOrders',auth,async(req,res) => await getallorders(req,res))

module.exports = app