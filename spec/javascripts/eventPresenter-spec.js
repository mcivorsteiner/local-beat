describe("EventPresenter", function(){
  it("should have a createMarkers method", function(){
    expect(EventPresenter.createMarkers).toBeDefined()
  });

  it("tracks all the arguments of its calls", function() {
    expect(EventPresenter.createMarkers).toHaveBeenCalledWith({eventData})
  });

});
