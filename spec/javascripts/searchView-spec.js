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

    it("should always have a renderSearchErrorMessages method", function() {
      expect(searchView.renderSearchErrorMessages).toBeDefined()
    });

    // describe("renderSearchErrorMessages", function(){
    //   beforeEach(function(){
    //     $('body').append('<div class="search-status"><h4></h4></div>')
    //   });
    //   afterEach(function(){
    //     $('.search-status').remove()
    //   });

    //   it("calls its getSearchIcon function", function(){
    //     spyOn(searchView, 'getSearchIcon').and.returnValue($('.search-status'))
    //     searchView.renderSearchErrorMessages("errors")
    //     expect(searchView.getSearchIcon).toHaveBeenCalled()
    //   })
    // })
});