/// layout layers in a linear fashion
/*
  TODO:
  replace callback with events/pubsub/something better
  add initial x,y to props
*/
var Linear = function(options) {
  this.drawingLayers = (options.drawingLayers !== undefined) ? options.drawingLayers : [];
  this.callback = (options.callback !== undefined) ? options.callback : function() {};

  // value, min, max, step
  this.props = {
    count: [this.drawingLayers.length, 1, 200, 1],
    spacing: [10, -30, 30, 1],
    spacingChange: [0, -1, 1, 0.001],
    rotation: [0, -180, 180, 1],
    rotationChange: [0, -20, 20, 1]
  };

  // init properties
  for (var prop in this.props) {
    this[prop] = (options[prop] !== undefined) ? options[prop]: this.props[prop][0];
  }
};

Linear.prototype = {
  update: function() {
    var i = 0,
        pos = 0,
        count = (this.drawingLayers.length > 0) ? this.count : 0,
        spacing = this.spacing,
        spacingChange = this.spacingChange,
        rotation = this.rotation,
        rotationChange = this.rotationChange;
    while (pos < count) {
      var drawingLayer = this.drawingLayers[i];
      var newDrawingLayer = drawingLayer.update(drawingLayer.x, drawingLayer.y);
      newDrawingLayer.x += Math.cos(rotation * Math.PI/180) * (pos * spacing);
      newDrawingLayer.y += Math.sin(rotation * Math.PI/180) * (pos * spacing);
      spacing = spacing + spacingChange;
      rotation = rotation + rotationChange;
      i++;
      pos++;
      if (i >= this.drawingLayers.length) {
        i = 0;
      }
    }
    this.callback();
  }
};

module.exports = Linear;