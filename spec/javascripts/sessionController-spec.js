returnTypeOf = function(object){
  return Object.prototype.toString.apply(object)
}

describe ("Session Controller NameSpace", function() {
  it("is defined", function(){
    expect(SessionController).toBeDefined()
  });
})

describe("Session Controller", function() {
  beforeEach(function(){
    view = new MapView()
    controller = new SessionController(view)
  });

  it("sets listeners upon initialization", function(){
    expect(controller.setListeners).toBeDefined()
  });

  it("has a toggle login function", function(){
    expect(controller.toggleLogin).toBeDefined()
  });

  it("has a toggle sign up function", function(){
    expect(controller.toggleSignUp).toBeDefined()
  });

  it("has a login function", function(){
    expect(controller.login).toBeDefined()
  });

  it("has a sign up function", function(){
    expect(controller.signUp).toBeDefined()
  });

  it("has a login error function", function(){
    expect(controller.loginError).toBeDefined()
  });

  // would be good to have a test for "returns an error message json object if there is a login error"

  it("has a toggle session box function", function(){
    expect(controller.toggleSessionBox).toBeDefined()
  });

})
