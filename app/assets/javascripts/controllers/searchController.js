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
    this.view.getArtistSearchTextField().addEventListener('keyup', this.limitArtistSearchQueryCharacters)
  },

  renderErrorMessages: function(e, response, responseType, status){
    var errorMessages = response.responseText
    this.view.renderSearchErrorMessages(errorMessages)
  }, 

  limitArtistSearchQueryCharacters: function() {
    // debugger
    // console.log($(this).val())
    var textInput = $(this).val()
    // var textInput = (this.view.artistSearchField.bind(this.view)).val()
    // console.log(textInput)
    // if (textInput.length >= 3) {
    //     this.searchSuggestArtist(textInput)
    // }
  }

  // searchSuggestArtist: function(textInput) {
  //   $.ajax({url:"http://api.songkick.com/api/3.0/search/artists.json?query=" + textInput +"&apikey=pH29QOMdmJML48IO", type: 'GET', context: this}).done(this.renderArtistSearchSuggestionBox)
  // },

}
