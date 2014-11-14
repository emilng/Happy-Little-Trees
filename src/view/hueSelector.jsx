var React = require('react');

var obj = {
  getInitialState: function() {
    var color = this.props.model;
    var hueGradient = document.createElement('canvas');
    hueGradient.width = 10;
    hueGradient.height = 200;
    var hueContext = hueGradient.getContext('2d');
    var width = hueGradient.width;
    var height = hueGradient.height;
    var hue = 0;
    var row = height;
    while(row--) {
      hue = Math.round(row/height * 360);
      hueContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      hueContext.fillRect(0, row, width, 1);
    }
    return ({
      hueGradient: hueGradient
    });
  },
  handleMouseDown: function(event) {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
    this.updateHue(event);
  },
  handleMouseMove: function(event) {
    this.updateHue(event);
  },
  handleMouseUp: function(event) {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  },
  updateHue: function() {
    var hueCanvas = document.getElementById('hue-selector');
    var rect = hueCanvas.getBoundingClientRect();
    var y = event.clientY - rect.top;
    var hue = Math.round(y/hueCanvas.height * 360);
    var clampedHue = Math.min(Math.max(0, hue), 360);
    if (clampedHue !== this.props.model.hue) {
      this.props.model.hue = clampedHue;
      this.props.model.update();
    }
  },
  renderHue: function() {
    var hueCanvas = document.getElementById('hue-selector');
    var hueContext = hueCanvas.getContext('2d');
    hueContext.setTransform(1,0,0,1,0,0);
    hueContext.globalAlpha = 1;
    hueCanvas.width = hueCanvas.width;
    hueContext.fillStyle = '#000';
    var unclampedY = Math.floor(this.props.model.hue/360 * hueCanvas.height);
    var y = Math.min(Math.max(0, unclampedY), hueCanvas.height - 1);
    hueContext.fillRect(0, y, hueCanvas.width, 1);
    hueContext.drawImage(this.state.hueGradient, 5, 0);
  },
  render: function() {
    return (
      <div className="fl">
        <canvas
          id="hue-selector"
          width="20"
          height="200"
          onMouseDown={this.handleMouseDown}
        />
      </div>
    );
  }
};
obj.componentDidUpdate = obj.componentDidMount = obj.renderHue;
var HueSelector = React.createClass(obj);

module.exports = HueSelector;