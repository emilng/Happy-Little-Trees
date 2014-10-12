var LayersPanel = function() {

  var layersPanel = document.getElementById('layers-panel');
  var addLayerButton = document.getElementById('add-layer');

  var layerCount = 0;

  var addLayer = function() {
    var newLayer = document.createElement('div');
    newLayer.innerHTML = "Layer " + layerCount++;
    layersPanel.appendChild(newLayer);
    console.log('add layer');
  };
  addLayerButton.onclick = addLayer;

  var removeLayer = function() {
    console.log('remove layer');
  };

};

module.exports = LayersPanel;