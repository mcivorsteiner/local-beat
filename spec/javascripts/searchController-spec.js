describe("Search controller", function(){
    var searchController
    beforeEach(function(){
      searchController = new SearchController()
    });


    it("should always have a setListeners method", function() {
      expect(searchController.setListeners).toBeDefined()
    });

    it("should always have a renderSearchBar method", function() {
      expect(searchController.renderSearchBar).toBeDefined()
    });

    it("should always have a renderAdvancedOptions method", function() {
      expect(searchController.renderAdvancedOptions).toBeDefined()
    });
});