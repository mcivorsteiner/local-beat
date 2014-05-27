describe("Search controller", function(){
    var searchController, searchView
    beforeEach(function(){
      searchView = new SearchView()
      searchController = new SearchController(searchView)
    });

    it("should always have a setListeners method", function() {
      expect(searchController.setListeners).toBeDefined()
    });

    it("should always have a renderErrorMessages method", function() {
      expect(searchController.renderErrorMessages).toBeDefined()
    });

    describe("renderErrorMessages", function(){
      it("calls its views renderSearchErrorMessages function", function(){
        spyOn(searchController.view, 'renderSearchErrorMessages')
        searchController.renderErrorMessages(null, {responseText:"hello"})
        expect(searchController.view.renderSearchErrorMessages).toHaveBeenCalled()
      })
    })
});