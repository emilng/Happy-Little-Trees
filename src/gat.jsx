// Genarative Art Tool

// var Stats = require('../lib/stats.js');
var React = require('react');
var pixi = require('../lib/pixi.dev.js');
var DrawingLayer = require('./drawingLayer.js');
var Linear = require('./layout/linear.js');
var LayersPanel = require('./view/layersPanel.jsx');
var PropertiesPanel = require('./view/propertiesPanel.jsx');
var Layers = require('./model/layers.js');

window.onload = function(){

  // init layers panel
  var layers = new Layers();
  var layersPanel = document.getElementById('layers-panel');
  var renderLayersPanel = function() {
    React.renderComponent(<LayersPanel layers={layers}/>, layersPanel);
  };
  layers.update = renderLayersPanel;
  renderLayersPanel();

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

  var renderstage = function() {
    renderer.render(stage);
    stage.removeChildren();
  };

  // layout squares using linear layout
  var linearOptions = {
    drawingLayers: [dl]
  };
  var linear = new Linear(linearOptions);
  linear.update();

  var propertiesPanel = document.getElementById('properties-panel');
  var renderPropertiesPanel = function() {
    React.renderComponent(
      <PropertiesPanel
        source={linear}
        renderstage={renderstage}
      />,
      propertiesPanel
    );
    renderstage();
  };
  linear.callback = renderPropertiesPanel;

  renderPropertiesPanel();


};