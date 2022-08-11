const User=require("../models/user")

const get_wishlist=async(req,res)=>{
    if(req.user.user_id){
        User.findOne({user_id:req.user.user_id},(err,user) =>{
            if(err || !user){
                console.log('unable to find the user',err,user);
                res.status(400).send({msg:'unable to find user'})
            }
            else{
                let wishListIDs = user.wishlistProducts;
                let cleanedIDs = wishListIDs.map(eachwishlistID => {
                    try{
                        return mongoose.Types.ObjectId(eachwishlistID);
                    }
                    catch(e){
                        console.log("some value other than a proper id, so filtering it out",eachwishlistID,e);
                        return null;
                    }
                }).filter(objectID => {
                    if(objectID){
                        return true;
                    } else{
                        return false;
                    }
                })
                Product.find({_id: {$in: cleanedIDs}},(err,products) => {
                    if(err){
                        console.log("unable to fetch products",err);
                        res.status(400).send({msg:"unable to fetch products"})
                    } else{
                        res.send(products)
                    }
                })
            }
        })
    }
}

const post_wishlist=async(req,res)=>{
    const productId= req.body.productId;

    if(req.user.user_id){
        User.findOneAndUpdate({user_id:req.user.user_id},{$addToSet:{wishlistProducts:productId}}).exec((err,update) =>{
            if(err){
                console.log('unable to update wishlist',err);
                res.status(400).send({msg:'unable to add product to wishlist'});
            }
            else{
                res.send(update);
            }
        })
    }
    else{
        console.log('user session not found');
        res.status(400).send({msg: 'user session invalid'})
    }
}

const del_wishlist=async(req,res)=>{
    const productId = req.params.productId;
    console.log(productId)
    console.log(productId,typeof(productId));
    if(req.user.user_id){
        User.findOneAndUpdate({user_id:req.user.user_id},{$pull: {wishlistProducts: productId}}).exec((err,update) => {
            if(err){
                console.log('unable to remove');
                res.status(400).send({msg:'unable to remove from wishlist'});
            }
            else{
                res.send(update);
            }
        });
    } else{
        res.status(400).send({msg:'user session invalid'});
    }
}

module.exports={
    get_wishlist,
    post_wishlist,
    del_wishlist
}