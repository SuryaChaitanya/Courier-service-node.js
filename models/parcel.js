var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("../models/user.js")

var parcelSchema = new mongoose.Schema({
   sender :
   {
      first_name: String,
      last_name: String,
      email: String,
      phone: String,
      flat_no:Number,
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
   },
   receiver :
   {
      first_name: String,
      last_name: String,
      email: String,
      phone: String,
      flat_no:Number,
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
   },
   order_id  : String,
   user_id  : String,
});


module.exports = mongoose.model("Parcel",parcelSchema);