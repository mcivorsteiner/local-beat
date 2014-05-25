function SearchView(){
  this.searchWindowSelector = '#searchWindow'
  this.advOptionsSelector = '.advanced-options'
}

SearchView.prototype = {
  renderSearchBar: function(event) {
   $(this.searchWindowSelector).toggleClass('hidden')
  },

  renderAdvancedOptions:function(event){
    $(this.advOptionsSelector).toggleClass('hidden')
  }
}