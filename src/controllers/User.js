const User=require("../models/user")

var bcrypt = require('bcryptjs');//password encryption
var validator = require('password-validator');//encryption
const { body, validationResult } = require('express-validator')
var salt = bcrypt.genSaltSync(10);//salt

const user_post=async(req,res)=>{
    try{
        const {
            name,user_id,contact,password
        } = req.body
        console.log("executed try block")
        console.log(req.body)
        //validating password
        // if (!schema.validate(password)){
        //     throw error;
        // }
        

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        console.log("executed error ln(274) block")
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
        }
        console.log("skipped error block (line 277)")
        const users = await User.create({
            name,
            user_id,
            contact,
            password
        })
        console.log("created users (line 284)")
            if(users){
                return res.status(201).json({
                    "status":"user created"
                })
            }
    }
        catch (error){
            console.log('executed catch part')
            console.log(error.message)
        return res.status(500).json({"status": error.message})
    }
}

const user_login=async(req,res)=>{
    try{
        const {
            user_id,
            pass
        }=req.body;
        // console.log(req.body)
        // console.log(user_id)
        // console.log(pass)
        const {password}=await User.findOne({"user_id":user_id});
        // console.log("cheched pass hash")
        // console.log(password);

    
        // console.log(pass,password,user_id);
        const isMatch=await bcrypt.compare(pass,password);
        // console.log("executed is match")
        // console.log("same",isMatch)
        if(isMatch){
            // req.session.user_id=user_id;
            // console.log(req.session.user_id)
            // console.log("executed and success login")
            // console.log(req.session);
            const user=await User.findOne({"user_id":user_id});
            // console.log(user)
            const token=user.generateAuthToken()
            // console.log(token)
            res.status(201).send({
                "message":"Logged In",
                "user":{"user_id":user_id,
                        "pass":pass},
                "token":token       
            })
        }
        else{
            console.log("executed and Failure login")
            return res.json({
                "message":"Incorrect credentials"
            })
        }
    }
    catch(err){
        console.log(err);
        console.log("executed error")
        return res.status(500).json({
            "status":err.message
        })
    }
}

const user_logout=async(req,res)=>{
    console.log(req.session.user_id);
    req.session.destroy();
    return res.status(200).json({
        "msg":"Logged out"
    });
}

module.exports = {
    user_post,
    user_login,
    user_logout
}