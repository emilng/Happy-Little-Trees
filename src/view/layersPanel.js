var LayersPanel = function() {

  var layersPanel = document.getElementById('layers-panel');
  var addLayerButton = document.getElementById('add-layer');
  var removeLayerButton = document.getElementById('remove-layer');
  var layerCount = 0;
  var currentLayer;
  var layers = [];

  var updateCurrentLayer = function(current) {
    var i = layers.length;
    currentLayer = current;
    while(i--) {
      if (layers[i] === currentLayer) {
        currentLayer.style['background-color'] = '#ddd';
      } else {
        layers[i].style['background-color'] = '#999';
      }
    }
  };

  var addLayer = function() {
    var thisLayer = document.createElement('div');
    thisLayer.setAttribute('class', 'layer-panel-layer');
    var layerName = 'Layer ' + layerCount++;
    thisLayer.innerHTML = layerName;
    layersPanel.appendChild(thisLayer);
    layers.push(thisLayer);
    updateCurrentLayer(thisLayer);

    thisLayer.onclick = function() {
      updateCurrentLayer(thisLayer);
    };
  };
  addLayerButton.onclick = addLayer;

  var removeLayer = function() {
    if (layers.length > 1) {
      layersPanel.removeChild(currentLayer);
      var layerIndex = layers.indexOf(currentLayer);
      layers.splice(layerIndex, 1);
      var newLayerIndex = Math.max(layerIndex - 1, 0);
      updateCurrentLayer(layers[newLayerIndex]);
    }
  };
  removeLayerButton.onclick = removeLayer;
};

module.exports = LayersPanel;