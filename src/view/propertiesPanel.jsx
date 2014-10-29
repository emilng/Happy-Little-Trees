var React = require('react');
var PanelSlider = require('./panelSlider.jsx');

var PropertiesPanel = React.createClass({
  render: function() {
    var properties = this.props.source.props;
    var propNames = Object.getOwnPropertyNames(properties);
    var update = this.props.source.update.bind(this.props.source);
    var sliders = propNames.map(function(propName, id) {
      var propValues = properties[propName];
      return (
        <PanelSlider
          key={id}
          name={propName}
          value={propValues[0]}
          min={propValues[1]}
          max={propValues[2]}
          step={propValues[3]}
          update={update}
          source={this.props.source}
        />
      );
    }, this);
    return (
      <div>{sliders}</div>
    );
  }
});

module.exports = PropertiesPanel;