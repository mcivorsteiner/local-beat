function SearchView(){
  this.searchWindowSelector = '#search-window'
  this.advOptionsSelector = '.advanced-options'
  this.searchIconSelector = '#magnify'
  this.advOptionsIconSelector = '#more-options-icon'
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

  renderSearchErrorMessages: function(errors){
    document.querySelector(this.searchStatusDiv).classList.remove("hidden")
    document.querySelector(this.searchStatusHeader).innerText = errors
  },

  getSearchIcon: function(){
    return document.querySelector(this.searchIconSelector)
  },

  getAdvOptionsIcon: function(){
    return document.querySelector(this.advOptionsIconSelector)
  },

  getSearchStatusHeader: function(){
    return document.querySelector(this.searchStatusHeader)
  }
}