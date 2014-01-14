var User = require("../../models/server/User");
var Message = require("../../models/server/Message");
module.exports = {
  send: function(req, res) {
    User.findById(req.session.userId, function(err, user){
      if(!user) return res.send(401, {result: err})
      user.sendMessage(req.body, function(err, response){
        if(err) return res.send(500, {result: err})
        res.send(200,response)
      })
    })
  },
  create: function(req, res) {
    User.findById(req.session.userId, function(err, user){
      if(err) return res.send(401, {result: err})
      Message.create({
        creator: user,
        body: req.body["body"]
      }, function(err, message){
        if(err) return res.send(500, {result: err})
        res.send(200, message)

      })
    })
  }
}