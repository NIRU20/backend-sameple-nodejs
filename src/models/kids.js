//pavdas
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const kidsSchema = new mongoose.Schema(
  {
    id: {
      type:String,
      unique:true
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    colour: {
      type:String,
      trim:true,
      required:true,
      maxlength:10,
    },
    weight:{
        type:Number,
    },
    border:{
        type:String,
        trim:true,
        required:true,
        maxlength:50,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      type: String,
      required:true
    },
    like:{
      type:Number,
      default:0
    },
    tags:{
      type:String
    },
    discount:{
      type:Number,
      default:0
    }
    
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("kids",kidsSchema);
