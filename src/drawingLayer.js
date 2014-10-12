var DrawingLayer = function(options) {
  this.x = (options.x !== undefined) ? options.x : 0;
  this.y = (options.y !== undefined) ? options.y : 0;
  this.rotation = (options.rotation !== undefined) ? options.rotation : 0;
  this.originX = (options.originX !== undefined) ? options.originX : 0;
  this.originY = (options.originY !== undefined) ? options.originY : 0;
  this.width = (options.width !== undefined) ? options.width : 0;
  this.height = (options.height !== undefined) ? options.height : 0;
  this.update = (options.update !== undefined) ? options.update : function(){};
};

module.exports = DrawingLayer;