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

    // afterEach(function(){
      // jasmine.Ajax.uninstall();
    // });

    it("should always have a setAjaxListeners method", function() {
      expect(appController.setAjaxListeners).toBeDefined()
    });

    it("should always have a setAjaxListeners method", function() {
      expect(appController.placeMarkers).toBeDefined()
    });
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

  });
});