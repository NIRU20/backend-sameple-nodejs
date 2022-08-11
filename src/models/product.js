const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
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
    zaritype:{
        type:String,
        trim:true,
        required:true,
        maxlength:30,
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
    },
    mouseover_images:{
      type:Array,
      default:[]
    },
    discounted_price:{
      type:Number,
    }
    
   
  },
  { timestamps: true }
);

// const Product =mongoose.model("product",productSchema);

module.exports = mongoose.model("product",productSchema);