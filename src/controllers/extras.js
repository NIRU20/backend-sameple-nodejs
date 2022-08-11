const Product=require("../models/product")
const {Order, ProductCart }=require("../models/order")
const User=require("../models/user")

const post_product_data=async(req,res)=>{
    console.log(req.body);
    const prod = new Product({
        name:req.body.name,
        description:req.body.description,
        colour:req.body.colour,
        zaritype:req.body.zaritype,
        weight:req.body.weight,
        border:req.body.border,
        price:req.body.price,
        category:req.body.category,
        stock:req.body.stock,
        sold:0,
        photo:req.body.photo
    });
    prod.save()
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message||"some error occured"
        });
    })
}

const list=async(req,res)=>{
    Product.find()
    .then(prods=>{
        res.send(prods);

    })
    .catch(err=>{
        console.log(err.message);
    })
}

const like=async(req,res)=>{
    Product.updateOne({
        'id':req.body.id,
        $inc:{like:1}
    })
}

const dislike=async(req,res)=>{
    Product.updateOne({
        'id':req.body.id,
        $dec:{like:1}
    })
}

const new_arrivels=async(req,res)=>{
    Product.find().sort({_id}).limit(50)
    .then(prods=>{
        res.send(prods);

    })
    .catch(err=>{
        console.log(err.message);
    })
}

const most_liked=async(req,res)=>{
    Product.find().sort({like:-1}).limit(50)
    .then(prods=>{
        res.send(prods);

    })
    .catch(err=>{
        console.log(err.message);
    })
}

const byid=async(req,res)=>{
    console.log(req.params.id);
    Product.findOne({"_id":req.params.id})
    .then(prods=>{
        res.send(prods);
        
    }).catch(err=>{
        console.log(err.message);
    })
}

const getlocationdata=async(req,res)=>{
    try{
        const userId = req.body.user_id || req.user.user_id; 
        const details = req.body;
        console.log("from get local data")
        console.log(details)
        console.log(details.dat)
        console.log(userId)
        User.findOne({user_id:userId},(err,user) => {
            if(err){
                console.log("if exceuted")
                console.log("error while updating the detials of the user", err);
                res.status(400).send({msg:"error while updating the details"});
            }else{
                console.log("else exceuted")
                var b64string =details.dat
                amt = Buffer.from(Buffer.from(b64string, 'base64').toString(), 'base64').toString()
                console.log(amt)
                res.status(200).send({"msg":"successfully set address"})
            }
        })
        }catch(err){
            console.log(err)
        }
}

const set_status=async(req,res)=>{
    const{
        order_id,
        Status
    }=req.body;

    const stat = await orders.findOneAndUpdate({"_id":order_id},{
        $set:{
            "status":Status
        }
    })
    if(stat){
        return res.status(200).json({
            "msg":"succesfull"
        })
    }
    return res.status(500).json({
        "msg":"didnt work"
    })
}

const delete_prod=async(req,res)=>{
    Product.deleteOne({"id":req.params.id})
    .then(data=>{
        res.sendStatus(200)
    })
    .catch(error=>{
        res.json({
            message: error.message
        })
    })
}

const wedding_skills=async(req,res)=>{
    Product.find({"tag":"wedding-silk"})
    .then(prods=>{
        res.send(prods)
    })
    .catch(err=>{
        console.log(err.message);
    })
}

module.exports={
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
}