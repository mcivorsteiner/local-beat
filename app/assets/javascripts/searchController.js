function searchController() {
  this.searchIcon = document.getElementById('magnify')
  this.advancedOptions = document.getElementById('advanced-search')
}

searchController.prototype = {
  init: function() {
    this.setListeners()
  },

  setListeners: function() {
    this.searchIcon.addEventListener('click', this.renderSearchBar)
    this.advancedOptions.addEventListener('click', this.renderAdvancedOptions)

  },

  renderSearchBar: function(event) {
    event.preventDefault();
    var searchWindow = document.getElementById('searchWindow')
    searchWindow.classList.toggle('hidden')
  },

  renderAdvancedOptions:function(event){
    event.preventDefault();
    var advancedSearchOptions = document.getElementById('advanced-options')
    advancedSearchOptions.classList.toggle('hidden')
  }

}