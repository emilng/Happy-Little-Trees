/// layout layers in a linear fashion

var Linear = function(options) {
  this.drawingLayers = (options.drawingLayers !== undefined) ? options.drawingLayers : [];
  this.count = (options.count !== undefined) ? options.count : this.drawingLayers.length;
  this.spacing = (options.spacing !== undefined) ? options.spacing : 10;
  this.spacingChange = (options.spacingChange !== undefined) ? options.spacingChange : 0;
  this.rotation = (options.rotation !== undefined) ? options.rotation : 0;
  this.rotationChange = (options.rotationChange !== undefined) ? options.rotationChange : 0;
};

Linear.prototype.update = function() {
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
};

module.exports = Linear;