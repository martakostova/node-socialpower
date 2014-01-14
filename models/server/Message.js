var mongoose = require("mongoose");
var _ = require("underscore");

var Message = new mongoose.Schema({
  body: { type: String, unique: true, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true }
})


module.exports = mongoose.model("Message", Message)