function SearchController(view) {
  this.view = view
  this.searchIcon = document.getElementById('magnify')
  this.advancedOptions = document.getElementById('advanced-search')
}

SearchController.prototype = {
  init: function() {
    this.setListeners()
  },

  setListeners: function() {
    this.searchIcon.addEventListener('click', this.view.renderSearchBar.bind(this.view))
    this.advancedOptions.addEventListener('click', this.view.renderAdvancedOptions.bind(this.view))
  }

}