function mapController(view){
  this.view = view
}

mapController.prototype = {
  init: function(){
    this.view.drawMap()
  }
}

