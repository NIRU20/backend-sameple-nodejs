const kids=require("../models/kids")

const kids_get=async(req,res)=>{
    console.log(req.user);
    kids.find()
    .then(pavdas=>{
        
        res.send(pavdas);
    })
    .catch(err=>{
        console.log(err.message);
    })
}

const kids_post=async(req,res)=>{
    console.log(req.body);
    const prod = new kids({
        name:req.body.name,
        description:req.body.description,
        colour:req.body.colour,
        weight:req.body.weight,
        border:req.body.border,
        price:req.body.price,
        category:req.body.category,
        stock:req.body.stock,
        photo:req.body.photo,
        discount:req.body.discount,
        discounted_price: (price - (discount*price/100)),
        mouseover_images:req.body.mouseover_images
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

module.exports = {
    kids_get,
    kids_post
}