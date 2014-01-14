var mongoose = require("mongoose");
var User = require("./User");
var _ = require("underscore");

var Message = new mongoose.Schema({
  body: { type: String, unique: true, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true }
})
Message.method("send", function(message, callback){
  // ToDo
  console.log(message)
  // 1. check is message already stored in DB (has _id property)
  // 1.1 create the message if not stored yet

  // 2. use message._id to find users who send the message before
  // 2.1. increment those users points
  // 
  // 3. add the message._id to current user's messages
})

module.exports = mongoose.model("Message", Message)