function SearchController(view) {
  this.view = view
}

SearchController.prototype = {
  init: function() {
    this.setListeners()
  },

  setListeners: function() {
    this.view.getSearchIcon().addEventListener('click', this.view.renderSearchBar.bind(this.view))
    this.view.getAdvOptionsIcon().addEventListener('click', this.view.renderAdvancedOptions.bind(this.view))
  },

  renderErrorMessages: function(e, response, responseType, status){
    debugger
  }

}