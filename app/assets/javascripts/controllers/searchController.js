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
    
    this.view.getLocationSearchTextField().addEventListener('keyup', this.view.limitLocationSearchQueryCharacters.bind(this.view))
    this.view.getArtistSearchTextField().addEventListener('keyup', this.view.limitArtistSearchQueryCharacters.bind(this.view))
  },
  
  renderErrorMessages: function(e, response, responseType, status){
    var errorMessages = response.responseText
    this.view.renderSearchErrorMessages(errorMessages)
  }
}
