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
    $('form#search').on('ajax:success', this.returnMarker)
    $('form#search').on('ajax:failure', this.appendErrors)


  },

  renderSearchBar: function(event) {
    event.preventDefault();
    var searchWindow = document.getElementById('searchWindow')
    searchWindow.classList.toggle('hidden')
  },

  renderAdvancedOptions:function(event){
    event.preventDefault();
    var advancedSearchOptions = document.querySelector('.advanced-options')
    advancedSearchOptions.classList.toggle('hidden-adv')
  },



}