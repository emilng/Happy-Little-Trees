/*
  hue2rgb, hslToRgb, and rgbToHsl conversion methods modified from:
  http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
*/
var Color = function(options) {
  options = options || {};
  this.callback = (options.callback !== undefined) ? options.callback : function() {};
  var rgbhex = (options.color !== undefined) ? parseInt(options.color, 16) : 0;

  this.setRgb(rgbhex);

  // value, min, max, step
  this.props = {
    hue: [this.hsl[0], 0, 360, 1],
    saturation: [this.hsl[1], 0, 100, 1],
    lightness: [this.hsl[2], 0, 100, 1],
    red: [this.rgb[0], 0, 255, 1],
    green: [this.rgb[1], 0, 255, 1],
    blue: [this.rgb[2], 0, 255, 1]
  };

  // init properties
  for (var prop in this.props) {
    this[prop] = (options[prop] !== undefined) ? options[prop]: this.props[prop][0];
  }
};

Color.prototype = {
  hue2rgb: function (p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1/6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1/2) {
      return q;
    }
    if (t < 2/3) {
      return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
  },
  /**
   * Converts an HSL color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * h is between 0 and 360,
   * s and l are between 1 and 100
   * returns r, g, and b between 0 and 255
   *
   * @param   Number  h       The hue
   * @param   Number  s       The saturation
   * @param   Number  l       The lightness
   * @return  Array           The RGB representation
   */
  hslToRgb: function(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    var r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = this.hue2rgb(p, q, h + 1/3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  },
  /**
   * Converts an RGB color value to HSL. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * r, g, and b are between 0 and 255
   * returns h, s, and l where
   * h is between 0 and 360
   * s and l are between 0 and 100
   *
   * @param   Number  r       The red color value
   * @param   Number  g       The green color value
   * @param   Number  b       The blue color value
   * @return  Array           The HSL representation
   */
  rgbToHsl: function(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max === min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  },
  hslHex: function(h, s, l) {
    var rgb = this.hslToRgb(h, s, l);
    return this.rgbHex.apply(this, rgb);
  },
  rgbHex: function(r, g, b) {
    // convert [r, g, b] array to single number
    var rgb = (r << 16) + (g << 8) + b;
    // pad hex number with zeros then truncate to 6 chars
    return ('000000' + rgb.toString(16)).substr(-6, 6);
  },
  setRgb: function(rgbhex) {
    this.rgb = [rgbhex >> 16 & 255, rgbhex >> 8 & 255, rgbhex & 255];
    this.hsl = this.rgbToHsl.apply(this, this.rgb);
    this.updateProperties();
  },
  updateProperties: function() {
    this.red = this.rgb[0];
    this.green = this.rgb[1];
    this.blue = this.rgb[2];
    this.hue = this.hsl[0];
    this.saturation = this.hsl[1];
    this.lightness = this.hsl[2];
  },
  update: function() {
    if (this.hue !== this.hsl[0] ||
        this.saturation !== this.hsl[1] ||
        this.lightness !== this.hsl[2]
      ) {
      this.hsl = [this.hue, this.saturation, this.lightness];
      this.rgb = this.hslToRgb.apply(this, this.hsl);
    } else {
      this.rgb = [this.red, this.green, this.blue];
      this.hsl = this.rgbToHsl.apply(this, this.rgb);
    }
    this.updateProperties();
    this.callback();
  },
  toString: function() {
    return this.rgbHex(this.red, this.green, this.blue);
  }
};

module.exports = Color;