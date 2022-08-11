const Razorpay = require('razorpay')
const Product=require("../models/product")
const {
    Payment,
    validate,
    validateUpdate
}=require("../models/payments")
const shortid = require('shortid')
const crypto = require("crypto");

const razorpay = new Razorpay({
	key_id: 'rzp_test_T2HxWhvL5jyVqs',
	key_secret: 'BcothMLHrdSTDzXvfVqlU1O9'
})

const verification =async(req,res)=>{
        // do a validation
        const secret = '12345678'

        console.log(req.body)
    
        const crypto = require('crypto')
    
        const shasum = crypto.createHmac('sha256', secret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')
    
        console.log(digest, req.headers['x-razorpay-signature'])
    
        if (digest === req.headers['x-razorpay-signature']) {
            console.log('request is legit')
            // process it
            require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
        } else {
            // pass it
        }
        res.json({ status: 'ok' })    
}

const razorpay_route=async(req,res)=>{
    const payment_capture = 1
    //load from sum of all items
    
    const amount = amt
    const currency = 'INR'

    const options = {
        amount:amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount:response.amount
        })
    } catch (error) {
        console.log(error)
    }
}

const transaction=async(req,res)=>{
    console.log(req.body)
    const transaction = new transactionSchema(req.body);
        transaction.save((err,saved) => {
        if(err){
            res.status(400).send({message:"unable to save transaction"})
        } else{
            res.send({message: "transaction successfully saved"});
        }
    })
}

const post_payment =async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let price=0
    console.log(req.body.prodictids[0])
    for(ide of req.body.prodictids){
        const product=await Product.findById(ide)
        price=price+(product.price)
    }

    var options={
        amount:price,
        currency:"INR",
        receipt: shortid.generate(),
    }
    try{
        const order=await razorpay.orders.create(options)
        let payment=new Payment({
            USID:req.user.user_id,
            order_id:order.id,
            amount:price,
        })
        payment=await payment.save()
        res.status(200).send(payment)
    }catch(e){
        throw new Error(e)
    }
}

const update_payment=async (req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    const payment=await Payment.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    })

    if(!payment)
    throw new Error("The payment with the given id is not available")

    const order_id = payment.order_id;
    const razorpay_signature = payment.razorpay_signature;
    const razorpay_payment_id = payment.razorpay_payment_id;

    const body=order_id  + "|" +razorpay_payment_id

    let expectedSignature = crypto
    .createHmac("sha256", "BcothMLHrdSTDzXvfVqlU1O9")
    .update(body.toString())
    .digest("hex");

    console.log("sig" + razorpay_signature);
    console.log("sig_e" + expectedSignature); 

    if(!expectedSignature===razorpay_signature)
    throw new Error("Invalid signature")

    payment.status="SUCCESS"
    await payment.save()

    res.status(200).send(payment)
}

module.exports={
    verification,
    razorpay_route,
    transaction,
    post_payment,
    update_payment
}