describe("Application controller", function(){
  describe("functions of the application controller", function(){
    var seshController, mapController, searchController, appController
    beforeEach(function(){
      // jasmine.Ajax.install();
      seshController = new SessionController()
      mapController = new MapController()
      searchController = new SearchController()
      appController = new ApplicationController(seshController, mapController, searchController)
    });

    it("should always have a setAjaxListeners method", function() {
        expect(appController.setAjaxListeners).toBeDefined()
      });

    it("should always have a placeMarkers method", function() {
        expect(appController.placeMarkers).toBeDefined()
    });

    it("should always have a login method", function (){
      expect(appController.login).toBeDefined()
    });

    it("should always have a signUp method", function() {
      expect(appController.signUp).toBeDefined()
    });

    it("should always have a get current location of user method", function(){
      expect(appController.getCurrentLocation).toBeDefined()
    });

    it("should always have a location received method", function(){
      expect(appController.locationReceived).toBeDefined()
    });

    it("should always have a user logged in method", function(){
      expect(appController._userLoggedIn).toBeDefined()
    });

    it("should always have a set current location method", function(){
      expect(appController.setCurrentLocation).toBeDefined()
    });

    it("should always have a get events for user location preference", function(){
      expect(appController.getEventsForUserLocationPreference).toBeDefined()
    });

    it("should always have a place events for user location preference method", function(){
      expect(appController.placeEventsForUserLocationPreference).toBeDefined()
    });
  });
});

   // it("should always have a setAjaxListeners method", function() {
    //   expect(appController.placeMarkers).toBeDefined()
    // });
    // it("places markers on ajax success", function(){
      // var doneFn = jasmine.createSpy("setAjaxListeners");
      // var xhr = new XMLHttpRequest();

      // xhr.onreadystatechange = function(arguments) {
      //   if (this.readyState == this.DONE) {
      //     doneFn(this.responseText);
      //   }
      // }
      // xhr.open("GET", "/events");
      // xhr.send();

      // expect(jasmine.Ajax.request.mostRecent().url).toBe('/events');
      // expect(doneFn).not.toHaveBeenCalled();
      // })