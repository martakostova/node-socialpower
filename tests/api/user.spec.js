describe("user api", function(){
  var request = require("request").defaults({jar: true})
  var helpers = require("../helpers")
  var message1;
  it("starts", helpers.startApiHttpServer)

  it("registers new user", function(next){
    request.post({
      uri: helpers.apiendpoint+"/users/register",
      json: {
        username: "testuser",
        password: "test"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      expect(body.result._id).toBeDefined()
      next()
    })
  })

  it("logout user", function(next){
    request.get({
      uri: helpers.apiendpoint+"/users/me/logout",
      json: {}
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      next()
    })
  })

  it("login user", function(next){
    request.get({
      uri: helpers.apiendpoint+"/users/me/login",
      json: {
        username: "testuser",
        password: "test"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      expect(body.result._id).toBeDefined()
      expect(body.result.username).toBe("testuser")
      expect(body.result.password).not.toBeDefined()
      next()
    })
  })

  it("creates message", function(next){
    request.post({
      uri: helpers.apiendpoint+"/messages/new",
      json: {
        body: "This is my awesome msg"
      }
    }, function(err, res, body){
      expect(res.statusCode).not.toBe(401)
      expect(res.statusCode).toBe(200)
      message1 = body;
      expect(body._id).toBeDefined()
      expect(body.body).toBe("This is my awesome msg")
      next()
    })
  })

  it("sends message", function(next){
    request.post({
      uri: helpers.apiendpoint+"/messages/send",
      json: message1
    }, function(err, res, body){
      expect(body).toBeDefined()
      next()  
    })
    
  })

  it("stops", helpers.stopApiHttpServer)
  
})