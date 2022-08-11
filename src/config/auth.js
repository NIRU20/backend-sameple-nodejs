//phone number and otp
var express = require("express");
var router = express.Router();

router.get("/signin",(req,res)=>{
    res.send("signed In");
})

router.get("/signout",(req,res)=>{
    res.send("signed out");
})

module.exports = router;