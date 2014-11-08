var React = require('react');
var PropertiesPanel = require('./propertiesPanel.jsx');

var ColorPanel = React.createClass({
  componentDidMount: function() {
    var colorSwatch = document.getElementById('color-swatch');
    var swatchContext = colorSwatch.getContext('2d');
    this.renderSwatch(swatchContext);
  },
  componentDidUpdate: function() {
    var colorSwatch = document.getElementById('color-swatch');
    var swatchContext = colorSwatch.getContext('2d');
    this.renderSwatch(swatchContext);
  },
  renderSwatch: function(context) {
    context.fillStyle = '#' + this.props.model.toString();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height/2);
  },
  render: function() {
    return (
      <div>
        <span>
          <canvas id="color-swatch" width="40" height="40" />
          <div>
            <button>Ok</button>
            <button>Cancel</button>
          </div>
        </span>
        <PropertiesPanel
          model={this.props.model}
        />
      </div>
    );
  }
});

module.exports = ColorPanel;