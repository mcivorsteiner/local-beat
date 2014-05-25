describe("Google Maps View", function() {
  var view, controller;
  beforeEach(function() {
    view = new MapView()
    spyOn(view, 'drawMap')
    controller = new MapController(view).init()
  });

  it("gets into the drawMap function", function() {
    expect(view.drawMap).toHaveBeenCalled()
  });

})