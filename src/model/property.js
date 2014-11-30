/*
  property container
  properties can have multiple sources
  each source has its own value stored as a sequence
  each source can have its own callback when a value is set
*/
var Sequence = require('../data/sequence.js');

var Property = function(options) {
  this.init(options);
};

Property.prototype = {
  init: function(value) {
    this.sources = [];
    this.values = [];
    this.callbacks = [];
    this.callbackContexts = [];
    value = value || 0;
    this.addSource({source: this, value: value});
    this.setSource(this);
  },
  addSource: function(options) {
    if (options.source !== undefined && options.value !== undefined) {
      this.sources.push(options.source);
      this.values.push(new Sequence({source: options.value}));
      this.setCallback(options);
    }
  },
  setCallback: function(options) {
    if (options.callback !== undefined) {
      this.callbacks.push(options.callback);
      if (options.callbackContext !== undefined) {
        this.callbackContexts.push(options.callbackContext);
      } else {
        this.callbackContexts.push(options.source);
      }
    } else {
      this.callbacks.push(this.callback);
      this.callbackContexts.push(this);
    }
  },
  removeSource: function(source) {
    var index = this.sources.indexOf(source);
    if (index > -1) {
      if (this.source === source) {
        this.setSource(this.sources[this.index-1]);
      }
      this.sources.splice(index, 1);
      this.values.splice(index, 1);
      this.callbacks.splice(index, 1);
      this.callbackContexts.splice(index, 1);
    }
  },
  setSource: function(source) {
    this.source = source;
    this.index = this.sources.indexOf(source);
    this.value = this.values[this.index];
    this.callback = this.callbacks[this.index].bind(this.callbackContexts[this.index]);
  },
  set: function(value) {
    this.value = new Sequence({source:value});
    this.values[this.index] = this.value;
    this.callback();
  },
  get: function() {
    return this.value;
  },
  callback: function() {}
};

module.exports = Property;