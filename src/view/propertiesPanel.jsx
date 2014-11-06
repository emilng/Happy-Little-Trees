var React = require('react');
var Slider = require('./Slider.jsx');

var PropertiesPanel = React.createClass({
  render: function() {
    var properties = this.props.model.props;
    var propNames = Object.getOwnPropertyNames(properties);
    var update = this.props.model.update.bind(this.props.model);
    var sliders = propNames.map(function(propName, id) {
      var propValues = properties[propName];
      return (
        <Slider
          key={id}
          name={propName}
          value={this.props.model[propName]}
          min={propValues[1]}
          max={propValues[2]}
          step={propValues[3]}
          update={update}
          model={this.props.model}
        />
      );
    }, this);
    return (
      <div>
        <div className="section-title">Properties</div>
        <div id="properties-panel-slider-container">{sliders}</div>
      </div>
    );
  }
});

module.exports = PropertiesPanel;