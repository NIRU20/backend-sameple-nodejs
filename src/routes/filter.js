const{
    filter_category,
    filter_price,
    filter_discount
}=require("../controllers/filter")

const express=require("express")

const app = express.Router();


//category filter
app.get("/category/:category",async(req,res)=>await filter_category(req,res))

//filter based on price
app.get("/price/:start_price/:end_price",async(req,res)=>await filter_price(req,res))
//filter based on discount
app.get("/discount/:discount",async(req,res)=>await filter_discount(req,res))

module.exports=app