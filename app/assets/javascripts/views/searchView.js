function SearchView(){
  this.searchWindowSelector = '#searchWindow'
  this.advOptionsSelector = '.advanced-options'
}

SearchView.prototype = {
  renderSearchBar: function(event) {
   // $(this.searchWindowSelector).toggleClass('hidden')
   // $(this.searchWindowSelector).slideDown("slow")
   if ($(this.searchWindowSelector).is(':hidden')){
    $(this.searchWindowSelector).slideDown("slow");
   } else {
    $(this.searchWindowSelector).hide(500)
   }

  },

  renderAdvancedOptions:function(event){
    // $(this.advOptionsSelector).toggleClass('hidden')
    if ($(this.advOptionsSelector).is(':hidden')){
      $(this.advOptionsSelector).slideDown("slow");
    } else {
      $(this.advOptionsSelector).hide(500)
    }
  }
}