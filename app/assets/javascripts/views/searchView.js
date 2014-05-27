function SearchView(){
  // this.untilities = new Utility()
  this.searchWindowSelector = '#search-window'
  this.advOptionsSelector = '.advanced-options'
  this.searchIconSelector = '#magnify'
  this.advOptionsIconSelector = '#more-options-icon'
  this.locationSearchTextField = '#user_input_location_name'
  this.artistSearchTextField = '#artist_name'
  this.searchStatusDiv = '.search-status'
  this.searchStatusHeader = '.search-status h4'
}

SearchView.prototype = {
  renderSearchBar: function(event) {
    // $(".loc-submit").addClass("hide-submit")
    // $('.pop-up').hide()
    // $(this.advOptionsIconSelector).show()
    $('#user_input_location_name').val('')
    $('#artist_name').val('')

    this.getSearchStatusHeader().innerText = ""
    
    if ($(this.searchWindowSelector).is(':hidden')){
      $('.pop-up').hide()
      $(this.searchWindowSelector).slideDown("slow")
      $(this.advOptionsIconSelector).show() 
    } else {
      $(this.searchWindowSelector).hide(500)
      $(this.advOptionsIconSelector).hide(500)
    }
  },

  renderAdvancedOptions:function(event){
    $(".loc-submit").removeClass("hide-submit")
    if ($(this.advOptionsSelector).is(':hidden')){
      $(this.advOptionsSelector).slideDown("slow");
    } else {
      $(this.advOptionsSelector).hide()
    }
  },

  renderSearchErrorMessages: function(errors){
    this.getSearchStatusDiv().classList.remove("hidden")
    this.getSearchStatusHeader().innerText = errors
  },

  getSearchIcon: function(){
    return document.querySelector(this.searchIconSelector)
  },

  getAdvOptionsIcon: function(){
    return document.querySelector(this.advOptionsIconSelector)
  },

<<<<<<< HEAD
  getArtistSearchTextField: function() {
    return document.querySelector(this.artistSearchTextField)
  },

  getLocationSearchTextField: function(){
    return document.querySelector(this.locationSearchTextField)
  },

// Suggest box for the artists

  limitArtistSearchQueryCharacters: function() {
    var textInput = $(this.artistSearchTextField).val()
    if (textInput.length >= 3) {
        this.searchSuggestArtist(textInput)
    }
  },

  searchSuggestArtist: function(textInput) {
    $.ajax({url:"http://api.songkick.com/api/3.0/search/artists.json?query=" + textInput +"&apikey=pH29QOMdmJML48IO", type: 'GET', context: this}).done(this.renderArtistSearchSuggestionBox)
  },

  renderArtistSearchSuggestionBox: function(json) {
    var artists = json.resultsPage.results.artist
    // var resultsLength = json.resultsPage.results.length
    var artistArray = []

      for (var i = 0; i < 5; i ++){
        if(artists[i] !== undefined){
        artistArray.push(artists[i].displayName)
         $(this.artistSearchTextField).autocomplete({ source: artistArray })
      }
      var utilities = new Utilities()

     $(this.artistSearchTextField).autocomplete({ source: utilities.uniq(artistArray) })
    }
      // $(this.artistSearchTextField).autocomplete({ source: artistArray })
  },

// Suggest box for the locations

  limitLocationSearchQueryCharacters: function() {
    var textInput = $(this.locationSearchTextField).val()
    if (textInput.length >= 1) {
        this.searchSuggestLocation(textInput)
    }
  },

  searchSuggestLocation: function(textInput) {
    $.ajax({url:"http://api.songkick.com/api/3.0/search/locations.json?query=" + textInput +"&apikey=pH29QOMdmJML48IO", type: 'GET', context: this}).done(this.renderLocationSearchSuggestionBox)
  },

  renderLocationSearchSuggestionBox: function(json) {

    var locations = json.resultsPage.results.location
    var locationArray = []

      for (var i = 0; i < 5; i ++){
        if(locations[i]!== undefined){
        locationArray.push(locations[i].city.displayName, locations[i].metroArea.displayName)
      }

      var utilities = new Utilities()

     $(this.locationSearchTextField).autocomplete({ source: utilities.uniq(locationArray) })
    }

  getSearchStatusHeader: function(){
    return document.querySelector(this.searchStatusHeader)
  },

  getSearchStatusDiv: function(){
    return document.querySelector(this.searchStatusDiv)

  }
}



