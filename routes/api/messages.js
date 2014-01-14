var User = require("../../models/server/User");
var Message = require("../../models/server/Message");
module.exports = {
  send: function(req, res) {
    User.findById(req.session.userId, function(err, user){
      user.sendMessage(req.body, function(err, response){
        console.log(response)
        if(err) return res.send(500, {result: err})
        res.send(response)
      })
    })
  },
  new: function(req, res) {
    User.findById(req.session.userId, function(err, user){
      if(err) return res.send(401, {result: err})
      Message.create({
        creator: user._id,
        body: req.body["body"]
      }, function(err, message){
        if(err) return res.send(500, {result: err})
        res.send(message)

      })
    })
  }
}