const {
    get_userdetail,
    post_userdetail
}=require("../controllers/Userdetails")

const express=require("express")
const auth=require("../Middlewares/auth")
const app = express.Router();

app.get("/",auth,async(req,res) => await get_userdetail(req,res))

app.post("/",auth,async(req,res) => await post_userdetail(req,res))

app.route('/')

module.exports=app