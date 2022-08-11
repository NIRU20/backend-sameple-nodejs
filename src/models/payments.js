const mongoose = require('mongoose')
const Joi=require('joi')

const Payment=mongoose.model(
    "Payments",
    new mongoose.Schema(
        {
            USID:{
                type:mongoose.Schema.ObjectId,
                required:true
            },
            order_id:{
                type:String
            },
            amount:{
                type:Number,
                required:true
            },
            status:{
                type:String,
                enum:["SUCCESS","FAIL","PENDING","CREATED"],
                default:"CREATED"
            },
            razorpay_payment_id: {
                type: String,
              },
              razorpay_order_id: {
                type: String,
              },
              razorpay_signature: {
                type: String,
              },
        },
        {
            timestamps:true
        }
    )
)

const validate=(payment)=>{
    const schema=Joi.object({
        type:Joi.string().min(2).max(30),
        prodictids:Joi.array().required(),
        USID:Joi.string().required(),
    })
    return schema.validate(payment)
}

const validateUpdate=(payment)=>{
    const schema=Joi.object({
        type:Joi.string.min(2).max(30),
        azorpay_payment_id: Joi.string(),
        razorpay_order_id: Joi.string(),
        razorpay_signature: Joi.string(),
        PID:Joi.string()
    })
}

module.exports = {
    Payment,
    validate,
    validateUpdate
}