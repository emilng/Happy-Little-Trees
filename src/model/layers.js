/*
  TODO: replace update callback with events or pubsub
*/

var Layers = function(layerData) {
  this.data = layerData || [{name: 'Layer 0'}];
  this.update = function() {};
};

Layers.prototype = {
  layerCount: 0,
  addLayer: function(index) {
    this.layerCount++;
    var newLayer = {name: 'Layer ' + this.layerCount};
    this.data.splice(index, 0, newLayer);
    this.update();
  },
  removeLayer: function(index) {
    if (this.data.length > 1) {
      this.data.splice(index, 1);
      this.update();
    }
  }
};

module.exports = Layers;