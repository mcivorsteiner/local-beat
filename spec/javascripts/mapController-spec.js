returnTypeOf = function(object){
  return Object.prototype.toString.apply(object)
}

describe ("Map Controller NameSpace", function() {
  it("is defined", function(){
    expect(MapController).toBeDefined()
  });
})

describe("Map Controller", function() {
  beforeEach(function(){
    view = new MapView()
    spyOn(view, 'drawMap')
    controller = new MapController(view)
  });

  it("creates a new map upon initialization", function(){
    expect(view.drawMap).toBeDefined()
  });

  it("has a place markers function", function(){
    expect(controller.placeMarkers).toBeDefined()
  });
})


//other tests that would be great to have:
// "produces an array of event objects" (having trouble stubbing out the view.placeMarkers function)
//