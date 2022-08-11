const Product=require("../models/product")

const filter_category=async(req,res)=>{
    Product.find({"category":req.params.category})
    .then(prods=>{
        res.send(prods);
    })
    .catch(err=>{
        console.log(err.message);
    })
}

const filter_price=async(req,res)=>{
    start_price=parseInt(req.params.start_price);
    end_price = parseInt(req.params.end_price);
    Product.find({
        $and:
        [{price:{$gte:start_price}},{price:{$lt:end_price}}]
    })
    .then(prods=>{
        res.send(prods);
    })
    .catch(err=>{
        console.log(err.message);
      
    })
}

const filter_discount=async(req,res)=>{
    discount = parseInt(req.params.discount);
    Product.find({"discount":{$gte:discount}})
    .then(prods=>{
        res.send(prods);
    })
    .catch(err=>{
        console.log(err.message);
    })
}

module.exports={
    filter_category,
    filter_price,
    filter_discount
}