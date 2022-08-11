const {
    verification,
    razorpay_route,
    transaction,
    post_payment,
    update_payment
}=require("../controllers/payment")
const express=require("express")

const app = express.Router();
const auth=require("../Middlewares/auth")

app.post('/verification', async(req, res) => await verification(req,res))

app.post('/razorpay', async (req, res) => await razorpay_route(req,res))

app.post('/transaction', async(req,res) => await transaction(req,res))

app.post("/",auth,async(req,res)=>await post_payment(req,res))

app.put("/:id",async(req,res)=>await update_payment(req,res))

module.exports=app