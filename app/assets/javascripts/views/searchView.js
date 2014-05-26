function SearchView(){
  this.searchWindowSelector = '#search-window'
  this.advOptionsSelector = '.advanced-options'
}

SearchView.prototype = {
  renderSearchBar: function(event) {
   $(this.searchWindowSelector).toggleClass('hidden')
  },

  renderAdvancedOptions:function(event){
    if ($(this.advOptionsSelector).is(':hidden')){
      $(this.advOptionsSelector).slideDown("slow");
    } else {
      $(this.advOptionsSelector).hide()
    }
  }
}