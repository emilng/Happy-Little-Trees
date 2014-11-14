var React = require('react');
var PropertiesPanel = require('./propertiesPanel.jsx');
var ColorPalette = require('./colorPalette.jsx');
var HueSelector = require('./hueSelector.jsx');

var ColorPanel = React.createClass({
  getInitialState: function() {
    return ({
      previousColor: 0
    });
  },
  componentDidMount: function() {
    var colorSwatch = document.getElementById('color-swatch-current');
    var swatchContext = colorSwatch.getContext('2d');
    var previousColorSwatch = document.getElementById('color-swatch-previous');
    var previousSwatchContext = previousColorSwatch.getContext('2d');
    this.renderSwatch(swatchContext, this.props.model.toString());
    this.renderSwatch(previousSwatchContext, this.props.model.toString());
    this.setState({previousColor: this.props.model.toString()});
  },
  componentDidUpdate: function() {
    var colorSwatch = document.getElementById('color-swatch-current');
    var swatchContext = colorSwatch.getContext('2d');
    this.renderSwatch(swatchContext, this.props.model.toString());
  },
  renderSwatch: function(context, color) {
    context.fillStyle = '#' + this.props.model.toString();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  },
  handleOk: function() {
    this.props.visible = false;
  },
  handleCancel: function() {
    this.props.model.setRgb(this.state.previousColor);
    this.props.model.update();
    this.props.visible = false;
  },
  onClickPrevious: function() {
    this.props.model.setRgb(this.state.previousColor);
    this.props.model.update();
  },
  render: function() {
    return (
      <div className="fl">
        <ColorPalette
          model={this.props.model}
        />
        <HueSelector
          model={this.props.model}
        />
        <div className="fl">
          <div>
            <div>
              <canvas id="color-swatch-current" width="40" height="20" />
              <canvas onClick={this.onClickPrevious} id="color-swatch-previous" width="40" height="20" />
            </div>
            <div>
              <button>Ok</button>
              <button>Cancel</button>
            </div>
          </div>
          <PropertiesPanel
            model={this.props.model}
          />
        </div>
      </div>
    );
  }
});

module.exports = ColorPanel;