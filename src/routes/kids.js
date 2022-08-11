const {
    kids_get,
    kids_post
}=require("../controllers/kids")

const express=require("express")
const auth=require("../Middlewares/auth")
const app = express.Router();

//api for pavdas page
app.get("/",auth,async(req,res)=>await kids_get(req,res))

//posting pavdas
app.post("/",async(req,res)=>await kids_post(req,res))

module.exports=app