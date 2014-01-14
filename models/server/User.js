var mongoose = require("mongoose");
var crypto = require("crypto");
var Message = require("./Message");
var _ = require("underscore");
var User = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  points: {type: Number, default: 0 },
  messages: [{ type: mongoose.Schema.Types.ObjectId }]
})

var hashPassword = function(value) {
  var md5sum;
  md5sum = crypto.createHash('md5');
  md5sum.update(value);
  return md5sum.digest('hex');
}

User.pre("save", function(next) {
  if (!this.isModified('password'))
    return next();
  this.password = hashPassword(this.password);
  return next();
})

User.static("hashPassword", hashPassword)

User.static("available", function(email, username, callback) {
  this.findOne({ username: username }, callback);
})

User.static("findOneByUsernamePassword", function(username, password, callback) {
  var pattern = {
    username: username,
    password: this.hashPassword(password)
  }
  this.findOne(pattern).exec(callback);
})
User.method("hasMessage", function(message){
  return _.contains(this.messages, message._id)
})

User.method("sendMessage", function(message, callback){
  var self = this;
  Message.findOne({body: message.body}, function(err, result){
    if(result){ //already created msg, just resend it 
      self.points ++;

      if(!self.hasMessage(message))
        self.messages.push(result);
      self.save(function(err){
        if(err) console.error(err);
      })
      module.exports.findById(result.creator, function(err, creator){ //find the creator
        creator.points += 2
        creator.save(function(err){
          if(err) console.error(err);
          callback(null,self)
        })
      })
    }else { // a new message, not saved yet
      // TODO
      callback(null,self)
    }
  })  
})

module.exports = mongoose.model("User", User);