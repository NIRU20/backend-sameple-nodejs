const {
    get_wishlist,
    post_wishlist,
    del_wishlist
}=require("../controllers/wishlist")

const express=require("express")
const auth=require("../Middlewares/auth")
const app = express.Router();

app.route('/',auth)
.get(async(req,res) => await get_wishlist(req,res))
.post(async(req,res) =>await post_wishlist(req,res))

app.route('/:productId',auth)
.delete(async(req,res) =>await del_wishlist(req,res))

module.exports = app