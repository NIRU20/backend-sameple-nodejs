const {
    post_product_data,
    list,
    like,
    dislike,
    new_arrivels,
    most_liked,
    byid,
    getlocationdata,
    set_status,
    delete_prod,
    wedding_skills
}=require("../controllers/extras")

const express=require("express")
const auth=require("../Middlewares/auth")
const app = express.Router();

app.post('/',async(req,res)=>await post_product_data(req,res))
// lists all sarees
app.get("/list",async(req,res)=>await list(req,res))

//liking a product
app.put("/like",async(req,res)=>await like(req,res));

//disliking a product
app.put("/dislike",async(req,res)=>await dislike(req,res));

//new arrivals
app.get("/new-arrivals",async(req,res)=>await new_arrivels(req,res))

//most-liked section
app.get("/most-liked",async(req,res)=>await most_liked(req,res))

app.get("/byid/:id",async(req,res)=>await byid(req,res))

app.post('/getlocaldata',auth,async (req,res)=>await getlocationdata(req,res))

//to change order status
app.post("/set-status", async(req,res)=>await set_status(req,res))

//api to delete product
app.delete("/delete/:id",async(req,res)=>await delete_prod(req,res))

//pure wedding silk sarees
app.get("/wedding-silk",async(req,res)=>await wedding_skills(req,res))

module.exports = app