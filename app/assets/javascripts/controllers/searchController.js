function SearchController() {
  this.searchIcon = document.getElementById('magnify')
  this.advancedOptions = document.getElementById('advanced-search')
}

SearchController.prototype = {
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
    $('.advanced-options').toggleClass('hidden')
  }
}