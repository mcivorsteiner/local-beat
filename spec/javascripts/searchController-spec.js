describe("Search controller", function(){
    var searchController, searchView
    beforeEach(function(){
      searchView = new SearchView()
      searchController = new SearchController(searchView)
    });

    it("should always have a setListeners method", function() {
      expect(searchController.setListeners).toBeDefined()
    });

});