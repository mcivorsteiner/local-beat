function SearchView(){
  this.searchWindowSelector = '#search-window'
  this.advOptionsSelector = '.advanced-options'
  this.searchIconSelector = '#magnify'
  this.advOptionsIconSelector = '#more-options-icon'
  this.artistSearchTextField = '#artist_name'
}

SearchView.prototype = {
  renderSearchBar: function(event) {
    // $(".loc-submit").addClass("hide-submit")
    // $('.pop-up').hide()
    // $(this.advOptionsIconSelector).show()
    $('#user_input_location_name').val('')
    $('#artist_name').val('')
   if ($(this.searchWindowSelector).is(':hidden')){
    $('.pop-up').hide()
    $(this.searchWindowSelector).slideDown("slow")
    $(this.advOptionsIconSelector).show()
   }
   else {
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

  getSearchIcon: function(){
    return document.querySelector(this.searchIconSelector)
  },

  getAdvOptionsIcon: function(){
    return document.querySelector(this.advOptionsIconSelector)
  },

  getArtistSearchTextField: function() {
    return document.querySelector(this.artistSearchTextField)
  },

  // delayArtistSearchQuery: function() {
  //   var delay = (function() {
  //     var timer = 0
  //   })
  // },



  // delay=(function(){
  //   searchSuggest(textInput)
  // })
  delay: function() {
    var timer = 0
    return function(callback, ms) {
      clearTimeout (timer)
      timer = setTimeout(callback, ms);
    }()
  },

  limitArtistSearchQueryCharacters: function() {
    var textInput = $(this.artistSearchTextField).val()
    if (textInput.length >= 3) {
      //we can call the delay function inside of here that will take as a function the searchSuggest(textinput)

        this.searchSuggest(textInput)

      // this.searchSuggest(textInput)
    }
  },

  searchSuggest: function(textInput) {
    $.ajax({url:"http://api.songkick.com/api/3.0/search/artists.json?query=" + textInput +"&apikey=pH29QOMdmJML48IO", type: 'GET', context: this}).done(this.renderSearchSuggestionBox)
  },

  renderSearchSuggestionBox: function(json) {
    var artists = json.resultsPage.results.artist
    var resultsLength = json.resultsPage.results.length
    var artistArray = []
    // console.log(artists.displayName)
      // $("#search-suggest ul").html("")
      for (var i = 0; i < 5; i ++){
        if(artists[i] !== undefined){
      //   // debugger
        artistArray.push(artists[i].displayName)

      // console.log(artistArray)
      //   console.log(artists)
        // $(this.artistSearchTextField).autocomplete({ source: artists[i].displayName })
         $(this.artistSearchTextField).autocomplete({ source: artistArray })
        // $("#search-suggest ul").append("<li>"+ artists[i].displayName + "</li>")
      }
    }
      // $(this.artistSearchTextField).autocomplete({ source: artistArray })
  }
}