var React = require('react');
var PanelLayer = require('./panelLayer.jsx');

var LayersPanel = React.createClass({
  getInitialState: function() {
    return ({
      selected: 0
    });
  },
  selectLayer: function(layerKey) {
    this.setState({
      selected: layerKey
    });
  },
  addLayer: function() {
    this.props.layers.addLayer(this.state.selected);
  },
  removeLayer: function() {
    this.props.layers.removeLayer(this.state.selected);
    var lastLayer = this.props.layers.data.length - 1;
    if (this.state.selected > lastLayer) {
      this.setState({
        selected: lastLayer
      });
    }
  },
  render: function() {
    var layers = this.props.layers.data;
    var panelLayers = layers.map(function(layer, id) {
      return (
        <PanelLayer
          key={id}
          name={layer.name}
          selected={this.state.selected === id}
          selectLayer={this.selectLayer}
        />
      );
    }, this);

    return (
      <div>
        <div className="section-title">Layers</div>
        <div id="layers-panel-buttons">
          <button id="add-layer" onClick={this.addLayer} >
            Add new layer
          </button>
          <button id="remove-layer" onClick={this.removeLayer} >
            Remove selected layer
          </button>
        </div>
        <div id="layers-panel-layer-container">{panelLayers}</div>
      </div>
    );
  }
});

module.exports = LayersPanel;