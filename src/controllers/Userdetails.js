const User=require("../models/user")

const get_userdetail=async(req,res)=>{
    const userId = req.query.user_id || req.user.user_id;
        if(!userId){
            return res.status(400).send({msg:"userId not provided and user not logged in"})
        } else{
            User.findOne({user_id: userId},(err,user) => {
                if(err){
                    res.status(400).send({"msg":"error while fetching user"})
                    console.log('error while finding user',err);
                }
                else if(!user){
                    res.status(400).send({msg:"user not found for given details"})
                    console.log('user not found');
                }
                else{
                    res.send(user);
                }
            })
        }
}

const post_userdetail=async(req,res)=>{
    try{
        const userId = req.body.user_id || req.user.user_id; 
        const details = req.body.details;
        console.log("from user details put")
        console.log(res.body)
        console.log(userId,details);
        User.findOne({user_id:userId},(err,user) => {
            if(err){
                console.log("error while updating the detials of the user", err);
                res.status(400).send({msg:"error while updating the details"});
            }
            else{
                user.address = details;
                user.save().then(saved => {
                    console.log("updated");
                    res.send(user)
                }).catch(err=>{
                    console.log("error while updating user",err);
                    res.send({"msg":"unable to update user"})
                })

            }
        })
        }catch(err){
            console.log(err)
        }
}

module.exports = {
    get_userdetail,
    post_userdetail
}