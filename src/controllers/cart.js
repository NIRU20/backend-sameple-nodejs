const User=require("../models/user")
const session = require('express-session');
const Product=require("../models/product")

const add_to_cart=async(req,res)=>{
    const{
        prod_id
    }=req.body;
    console.log("requested to add to cart")
    console.log(prod_id)
    // console.log(req.session)
    // console.log(req.session.user_id);
    if(!req.user.user_id){
        return res.status(500).json({
            "message":"Not logged in"
        })
    }
    const user = await User.findOneAndUpdate({"user_id":req.user.user_id},
            {
                $push:{
                    cart:prod_id
                }
            });

    return res.status(200).json({
        "message":"succesful"
    })
}

const get_cart=async(req,res)=>{
    try{
        const user = req.user.user_id;
        console.log("displaying cart request");
        console.log(req.user.user_id);
        if(!user){
            return res.status(400).send({"message":"user not found"})
        }
        const {cart} = await User.findOne({"user_id":user});
        let cleanedIDs = cart.map(eachcartID => {
            try{
                return mongoose.Types.ObjectId(eachcartID);
            }
            catch(e){
                console.log("some value other than a proper id, so filtering it out",eachcartID,e);
                return null;
            }
        }).filter(objectID => {
            if(objectID){
                return true;
            } else{
                return false;
            }
        })
        Product.find({_id:{$in: cleanedIDs}},(err,products) => {
            if(err){
                return res.status(400).json({"message":"unable to fetch products"})
            } else{
                return res.json(products)
            }       
        })
        // return res.status(200).send(cart);
        }catch(err){
            console.log("error found!!")
            console.log(err);
            return res.status(500).json({"message":"cart Empty"})
        }
}

const remove_from_cart=async(req,res)=>{
    const{
        prod_id
    }=req.body;
    console.log(req.user.user_id);
    if(!req.user.user_id){
        return res.status(500).json({
            "message":"Not logged in"
        })
    }
    const user = await User.findOneAndUpdate({"user_id":req.user.user_id},
            {
                $pull:{
                    cart:prod_id
                }
            });

    return res.status(200).json({
        "message":"succesful"
    })
}


const emptycart=async(req,res)=>{
    const userID = req.user.user_id;

    if(!userID){
        return res.status(400).json({message: "user not logged in"});
    } else{
        User.findOneAndUpdate({"user_id": userID}, { $set: { cart: []} }).exec((err,done) => {
            if(err){
                res.status(400).json({"message":"unable to empty the cart"})
            } else{
                res.status(200).json({"message":"cart empty success"})
            }
        })
    }
}

module.exports = {
    add_to_cart,
    get_cart,
    remove_from_cart,
    emptycart
}