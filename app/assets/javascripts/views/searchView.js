function SearchView(utility){
  this.utilities = new Utilities()
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

  getArtistSearchTextField: function() {
    return document.querySelector(this.artistSearchTextField)
  },

  getLocationSearchTextField: function(){
    return document.querySelector(this.locationSearchTextField)
  },

   getSearchStatusHeader: function(){
    return document.querySelector(this.searchStatusHeader)
  },

  getSearchStatusDiv: function(){
    return document.querySelector(this.searchStatusDiv)
  },

// Suggest box for the artists

  limitArtistSearchQueryCharacters: function() {
    // console.log("I'm here")
    var textInput = $(this.artistSearchTextField).val()
    if (textInput.length >= 3) {
        this.searchSuggestArtist(textInput)
    }
  },

  searchSuggestArtist: function(textInput) {
    $.getJSON("http://api.songkick.com/api/3.0/search/artists.json?query=" + textInput + "&apikey=pH29QOMdmJML48IO&jsoncallback=?").done(this.renderArtistSearchSuggestionBox.bind(this))
    // $.ajax({url:"http://api.songkick.com/api/3.0/search/artists.json?query=" + textInput +"&apikey=pH29QOMdmJML48IO&jsoncallback=?", type: 'GET', context: this}).done(this.renderArtistSearchSuggestionBox)
  },

  renderArtistSearchSuggestionBox: function(data) {

    var artists = data.resultsPage.results.artist
    console.log(artists)
    var artistArray = []
    var length = artists.length

    for (var i = 0; i < 5; i ++){
      if(artists[i] !== undefined){
          artistArray.push(artists[i].displayName)
      }
     // $(this.artistSearchTextField).autocomplete({ source: this.utilities.uniq(artistArray) })
    }
    console.log(this.utilities.uniq(artistArray))
    this.executeFunction(artistArray)

    // console.log(artistArray.join(", "))
    // window.setInterval(console.log("I'm here"), 5000)
    // $(this.artistSearchTextField).autocomplete({ source: this.utilities.uniq(artistArray) })
    
  },

  executeFunction: function(array){
    // window.setInterval(console.log("I'm here"), 3000)
    $(this.artistSearchTextField).autocomplete({ delay: 950, source: this.utilities.uniq(array) })
  },

// Suggest box for the locations

  limitLocationSearchQueryCharacters: function() {
    console.log("i'm here")
    var textInput = $(this.locationSearchTextField).val()
    if (textInput.length >= 1) {
        this.searchSuggestLocation(textInput)
    }
  },

  searchSuggestLocation: function(textInput) {
    $.getJSON("http://api.songkick.com/api/3.0/events.json?location=clientip&apikey=pH29QOMdmJML48IO&jsoncallback=?",
      function(data){
        console.log(data)
      // data is JSON response object
      });
    // $.ajax({url:'http://api.songkick.com/api/3.0/events.json?location=clientip&apikey=pH29QOMdmJML48IO&jsoncallback=?', type: 'GET', context: this}).done(this.seeWhatItreturns)
    // $.ajax({url:"http://api.songkick.com/api/3.0/search/locations.json?query=" + textInput +"&apikey=pH29QOMdmJML48IO&jsoncallback=?", type: 'GET', context: this}).done(this.renderLocationSearchSuggestionBox)
  },

  // seeWhatItreturns: function(data) {
  //   console.log(data)
  // },

  renderLocationSearchSuggestionBox: function(data) {
    // console.log(data)
    var locations = data.resultsPage.results.event
    console.log(data.resultsPage.results.event)
    var locationArray = []

      for (var i = 0; i < 5; i ++){
        if(locations[i]!== undefined){
        locationArray.push(locations[i].location.city, locations[i].metroArea.displayName)
      }

     $(this.locationSearchTextField).autocomplete({ source: this.utilities.uniq(locationArray) })
    }
  }
}



