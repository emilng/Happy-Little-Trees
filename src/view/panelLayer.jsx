var React = require('react');

var PanelLayer = React.createClass({
  getInitialState: function() {
    return {
      className: 'layer-panel-layer layer-panel-layer-unselected'
    };
  },
  selectLayer: function() {
    this.props.selectLayer(this.props.key);
  },
  render: function() {
    var selected = (this.props.selected) ? 'selected' : 'unselected';
    return (
      <div
        onClick={this.selectLayer}
        className={'layer-panel-layer layer-panel-layer-' + selected}
      >
        {this.props.name}
      </div>
    );
  }
});

module.exports = PanelLayer;