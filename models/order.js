var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("../models/user.js")

var orderSchema = new mongoose.Schema({
   type: String,
   number:Number,
   service:String,
   user_id:String,
   user_name:String
});


module.exports = mongoose.model("Order",orderSchema);