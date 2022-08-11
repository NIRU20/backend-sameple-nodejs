const {
    add_to_cart,
    get_cart,
    remove_from_cart,
    emptycart
}=require("../controllers/cart")

const express=require("express")
const auth=require("../Middlewares/auth")
const app = express.Router();

//adding products to cart
app.post("/add-to-cart",auth,async (req,res)=>await add_to_cart(req,res))
//display cart items
app.get("/cart",auth,async (req,res)=>await get_cart(req,res))

//to remove products from cart
app.post("/remove-from-cart",auth, async (req,res)=>await remove_from_cart(req,res))

app.get('/emptyCart',auth, async(req,res) => await emptycart(req,res))

module.exports = app