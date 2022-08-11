var mongoose = require("mongoose");
var bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")
const config=require("config")

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  contact:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  
  user_id: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  purchases: {
    type: Array,
    default: []
  },
  wishlistProducts: {
    type: Array,

  },
  cart:{
    type:Array,
    default:[]
  }
},
 {timestamp : true}
 );

 userSchema.pre("save", function (next) {
  // store reference
  
  const user = this;
  if (user.password === undefined) {
      return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
      
      if (err) console.log(err);
      // hash the password using our new salt
      bcrypt.hash(user.password, salt,function (err, hash) {
          if (err) console.log("here",err);
          user.password = hash;
         
         
          next();
      });
  });
});

userSchema.method("generateAuthToken",function(){
  const token=jwt.sign(
    {user_id:this.user_id},
    config.get("jwtPrivateKey")
  )
  return token
})

module.exports = mongoose.model("User", userSchema);