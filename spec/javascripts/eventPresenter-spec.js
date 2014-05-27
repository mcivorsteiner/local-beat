describe("EventPresenter exists", function(){
  var eventPresenter
  var eventObject

  beforeEach(function(){
    eventPresenter = new EventPresenter()
    eventObject = new Event({skEventId: 1, displayName: "Reggae Fest", date: '2104-07-10', artists: ["Bob Marley"]} )
    spyOn(eventPresenter, 'createMarkers')
    eventPresenter.createMarkers(eventObject)
  });

  it("should have a createMarkers method", function() {
    expect(eventPresenter.createMarkers).toBeDefined()
  });
});

describe("EventPresenter actions", function() {
  var eventPresenter
  var event
  var markers

  beforeEach(function() {
    eventPresenter = {
      createMarkers: function(event) {
        markers = [event];
      },
      getMarkers: function() {
        return markers
      }
    };

    spyOn(eventPresenter, "createMarkers").and.returnValue([event]);

    eventPresenter.createMarkers(event);
    fetchedCreateMarkers = eventPresenter.getMarkers();

  });


  it("tracks that the spy was called", function() {
    expect(eventPresenter.createMarkers).toHaveBeenCalled();
  });

   it("tracks all the arguments of its calls", function() {
    expect(eventPresenter.createMarkers).toHaveBeenCalledWith(event);
  });

  it("should not effect other functions", function() {
    expect(markers).toEqual(event);
  });

  it("when called returns the requested value", function() {
    expect(fetchedCreateMarkers).toEqual(event);
  });
});