// Genarative Art Tool

// var Stats = require('../lib/stats.js');
var pixi = require('../lib/pixi.dev.js');

var DrawingLayer = require('./drawingLayer.js');
var Linear = require('./layout/linear.js');
var LayersPanel = require('./view/layersPanel.js');

window.onload = function(){

  // init layers panel
  var layersPanel = new LayersPanel();

  // init draw view
  var stageWidth = 1000;
  var stageHeight = 640;

  var stage = new pixi.Stage(0xFFFFFF);
  var renderer = new pixi.autoDetectRenderer(stageWidth, stageHeight);
  var drawView = document.getElementById('draw-view');
  drawView.appendChild(renderer.view);

  // create drawing layer containing a square
  var layerOptions = {
    update: function(x, y) {
      var square = new pixi.Graphics();
      square.beginFill(0x000000);
      square.moveTo(0,0);
      square.drawRect(0,0,10,10);
      square.endFill();
      stage.addChild(square);
      square.x = x;
      square.y = y;
      return square;
    }
  };
  var dl = new DrawingLayer(layerOptions);
  dl.x = 200;
  dl.y = 200;


  // layout squares using linear layout
  var linearOptions = {
    drawingLayers: [dl],
    count: 200,
    spacing: 6,
    spacingChange: -0.04,
    rotation: 20,
    rotationChange: -5
  };
  var linear = new Linear(linearOptions);
  linear.update();

  renderer.render(stage);

};