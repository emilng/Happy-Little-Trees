var React = require('react');

var obj = {
  handleMouseDown: function(event) {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
    this.updateColor(event);
  },
  handleMouseMove: function(event) {
    this.updateColor(event);
  },
  handleMouseUp: function(event) {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  },
  updateColor: function() {
    var paletteCanvas = document.getElementById('color-palette');
    var rect = paletteCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var width = rect.right - rect.left;
    var height = rect.bottom - rect.top;
    var clampedX = Math.min(Math.max(0, x), width);
    var clampedY = Math.min(Math.max(0, y), height);
    var saturation = Math.round(clampedX/width * 100);
    var lightness = Math.round((1 - clampedY/height) * 100);

    if (this.props.model.saturation !== saturation ||
        this.props.model.lightness !== lightness) {
      this.props.model.saturation = saturation;
      this.props.model.lightness = lightness;
      this.props.model.update();
    }
  },
  renderPalette: function() {
    var color = this.props.model;
    var canvas = document.getElementById('color-palette');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var hue = color.hue;
    var row = height;
    var lightness;
    while(row--) {
      lightness = Math.round((1 - row/height) * 100);
      var gradient = context.createLinearGradient(0,row,width,row);
      gradient.addColorStop(0, 'hsl(' + hue + ', 0%, ' + lightness + '%)');
      gradient.addColorStop(1, 'hsl(' + hue + ', 100%, ' + lightness + '%)');
      context.fillStyle = gradient;
      context.fillRect(0, row, width, 1);
    }
    // render color indicator
    var saturation = color.saturation;
    lightness = color.lightness;

    var x = Math.round(saturation/100 * width);
    var y = Math.max(0, Math.round(-height * ((lightness/100) - 1)));

    context.beginPath();
    context.arc(x, y, 4, 2 * Math.PI, false);
    if (lightness < 50) {
      context.strokeStyle = '#FFFFFF';
    } else {
      context.strokeStyle = '#000000';
    }
    context.lineWidth = 1;
    context.stroke();
    console.log('renderPalette', x, y);
  },
  render: function() {
    return (
      <div className="fl color-palette">
        <canvas
          id="color-palette"
          width="200"
          height="200"
          onMouseDown={this.handleMouseDown}
        />
      </div>
    );
  }
};
obj.componentDidMount = obj.componentDidUpdate = obj.renderPalette;
var ColorPalette = React.createClass(obj);

module.exports = ColorPalette;