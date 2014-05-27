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

  limitArtistSearchQueryCharacters: function() {
    var textInput = $(this.artistSearchTextField).val()
    if (textInput.length >= 3) {
      this.searchSuggest(textInput)
    }
  },

  searchSuggest: function(textInput) {
    console.log(textInput)

    // $.ajax({url:"http://api.songkick.com/api/3.0/search/artists.json?query=" + textInput +"&apikey=pH29QOMdmJML48IO", type: 'GET', context: this}).done(this.renderSearchSuggestionBox)
    // $.ajax({url:"http://api.songkick.com/api/3.0/events.json?location=clientip&apikey=pH29QOMdmJML48IO&jsoncallback=?", type: 'GET', context: this}).done(this.renderSearchSuggestionBox)
  },

  renderSearchSuggestionBox: function(json) {
    console.log(json)
  }
}