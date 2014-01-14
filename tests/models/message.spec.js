describe("Message model", function(){
  var helpers = require("../helpers")
  var Message = require("../../models/server/Message")
  var User = require("../../models/server/User")
  var _ = require("underscore")
  beforeEach(helpers.connectMongoose)
  afterEach(helpers.disconnectMongoose)
  var msg = {
    "body": "an awesome msg"
  }
  var loggedUser = null;
  var message = null;

  it("cannot create message if not logged", function(next){
    Message.create(msg, function(err, result){
      expect(err).toBeDefined()
      next();
    })
  })
  it("creates user", function(next){
    User.create({
      "username": "test",
      "password": "123"
    }, function(err, user){
      expect(user._id).toBeDefined()
      loggedUser = user._id;
      next()
    })
  })

  it("creates message", function(next){
    Message.create(_.extend(msg, {creator: loggedUser}), function(err, result){
      expect(err).toBe(null)
      expect(result).toBeDefined()
      expect(result.creator).toBeDefined()
      message = result;
      next()  
    })
  })
  it("sends message", function(next){
    console.log(loggedUser)
    User.findById(loggedUser, '-password', function(err, user){
      console.log(user)
      expect(user).toBeDefined() 
      user.sendMessage(msg, function(err, result){
        expect(result).toBeDefined()
        next()
      })
    })
    
  })
})