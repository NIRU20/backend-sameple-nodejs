const Order=require("../models/order")

const get_order=async(req,res)=>{
    const userID = req.user.user_id;
    const orderID = req.query.order_id;
    if(!userID){
        return res.status(400).json({message:'User not logged in'})
    } else{
        Order.find({user: userID,_id:orderID},(err,orders) =>{
            if(err){
                res.status(400).send({message: "unable to find order"})
            }
            else{
                res.send(orders);
            }
        })
    }
}


const getallorders=async(req,res)=>{
    const userID = req.user.user_id;
    console.log("get all orders")
    console.log(userID)
    if(!userID){
        return res.status(400).json({message:'User not logged in'})
    } else{
        Order.find({user: userID},(err,orders) =>{
            if(err){
                res.status(400).send({message: "unable to find order"})
            }
            else{
                res.send(orders);
            }
        })
    }
}

const post_order=async(req,res)=>{
    const{
        user_id,
        destinationAddress,
        products
    }=req.body;
    console.log("from order post API")
    console.log(req.body)
    console.log(req.body)
    const newOrder = await Order.create({
        products: products,
        user_id:user_id,
        destinationAddress:destinationAddress,

    })
    if(newOrder){
        return res.status(200).json({
            "msg":"order placed"
        })
    }
    return res.status(500).json({
        "msg":"did not work"
    })
}

const view_orders=async(req,res)=>{
    // console.log(Order);
    const orderss = await Order.find({},(err,orders) =>{
        if(err){
            res.status(400).send({msg: "unable to send orders"})
        }
        else{
            console.log(err,orders);
            res.send(orders)
        }

    });
    // return res.status(200).send(orders);
}

const view_filter_new=async(req,res)=>{
    const orders = await Order.find({"status":status})
    return res.status(200).send(orders);
}

module.exports = {
    get_order,
    post_order,
    view_orders,
    view_filter_new,
    getallorders
}