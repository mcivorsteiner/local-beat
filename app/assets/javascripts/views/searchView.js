function SearchView(){
  this.searchWindowSelector = '#search-window'
  this.advOptionsSelector = '.advanced-options'
  this.searchIconSelector = '#magnify'
  this.advOptionsIconSelector = '#more-options-icon'
}

SearchView.prototype = {
  renderSearchBar: function(event) {
    $('.pop-up').hide()
    $(this.advOptionsIconSelector).show()
   if ($(this.searchWindowSelector).is(':hidden')){
    $(this.searchWindowSelector).slideDown("slow");
   } else {
    $(this.searchWindowSelector).hide(500)
   }
  },

  renderAdvancedOptions:function(event){
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
  }
}