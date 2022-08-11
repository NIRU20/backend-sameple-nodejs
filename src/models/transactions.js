var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var transactionSchema = new mongoose.Schema({
  payment_id: {
      type: String
  },
  order_id: {
      type: ObjectId,
      ref: "Order"
  },
  user_id: {
    type: ObjectId,
    ref: "User"
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
});



module.exports = mongoose.model("transaction", transactionSchema);