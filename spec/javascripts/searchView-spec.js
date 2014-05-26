describe("Search View", function(){
    var searchView
    beforeEach(function(){
      searchView = new SearchView()
    });

    it("should always have a renderSearchBar method", function() {
      expect(searchView.renderSearchBar).toBeDefined()
    });

    it("should always have a renderAdvancedOptions method", function() {
      expect(searchView.renderAdvancedOptions).toBeDefined()
    });
});