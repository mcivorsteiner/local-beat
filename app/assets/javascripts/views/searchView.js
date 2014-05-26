function SearchView(){
  this.searchWindowSelector = '#search-window'
  this.advOptionsSelector = '.advanced-options'
}

SearchView.prototype = {
  renderSearchBar: function(event) {
   $(this.searchWindowSelector).toggleClass('hidden')
   // if ($(this.searchWindowSelector).is(':hidden')){
   //  $(this.searchWindowSelector).slideDown("slow");
   // } else {
   //  $(this.searchWindowSelector).hide()
   // }

  },

  renderAdvancedOptions:function(event){
    // $(this.advOptionsSelector).toggleClass('hidden')
    if ($(this.advOptionsSelector).is(':hidden')){
      $(this.advOptionsSelector).slideDown("slow");
    } else {
      $(this.advOptionsSelector).hide()
    }
  }
}