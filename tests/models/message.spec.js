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
      loggedUser = user;
      next()
    })
  })

  it("creates message", function(next){
    Message.create(_.extend(msg, {creator: loggedUser._id}), function(err, result){
      expect(err).toBe(null)
      expect(result).toBeDefined()
      console.log(result);
      expect(result["creator"]).toBeDefined()
      next()  
    })
  })
})