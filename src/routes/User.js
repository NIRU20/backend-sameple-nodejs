const {
    user_post,
    user_login
}=require("../controllers/User")

const express=require("express")

const app = express.Router();
const { body, validationResult } = require('express-validator')

app.post(
    "/user",
    //express-validator
    //validating user_id
    body('user_id').isEmail(),
    //validating name
    body('name').isString(),
    //validating contact number
    body('contact').isMobilePhone(),
    async (req,res)=>await user_post(req,res))

//login
app.post("/login",async (req,res)=>await user_login(req,res))

//logout
app.get('/logout',async(req,res) => await user_logout(req,res));

module.exports = app