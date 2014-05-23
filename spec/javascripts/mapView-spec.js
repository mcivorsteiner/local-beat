describe("Google Maps View", function() {
  var view, controller;
  beforeEach(function() {
    view = new mapView()
    spyOn(view, 'drawMap')
    controller = new mapController(view).init()
  });

  it("gets into the drawMap function", function() {
    expect(view.drawMap).toHaveBeenCalled()
  });

})