/// infinite sequence with loop/oscillate options for finite arrays
/*
  defaults:
  source - can be a number, array or function
  sourceType - can be 'value', 'list', or 'function'
  value - is only used when sourceType is 'value'
  start - starting point for source list
  end - ending point for source list
  oscillate - looping behavior

  notes:
  a function is assumed to not have any range limits
  range returns a list
  index returns a single value
*/

var Sequence = function(options) {
  this.init(options);
};

Sequence.prototype = {
  init: function(options) {
    options = options || {};
    var defaults = {
      source: 0,
      sourceType: 'value',
      value: 0,
      start: 0,
      end: Infinity,
      oscillate: false
    };
    for (var prop in defaults) {
      this[prop] = (options[prop] !== undefined) ? options[prop] : defaults[prop];
    }

    if (Array.isArray(this.source) && (this.source.length > 0)) {
      this.sourceType = 'list';
    } else if (typeof this.source === 'function') {
      this.sourceType = 'function';
    } else if (typeof this.source !== 'number') {
      this.source = 0;
    }
  },
  index: function(index) {
    return this.range(index)[0];
  },
  range: function(rangeStart, rangeEnd) {
    rangeStart = rangeStart || 0;
    rangeEnd = rangeEnd || rangeStart;
    var rangeList = [];
    switch (this.sourceType) {
      case 'list':
        return this.rangeList(rangeStart, rangeEnd, rangeList);
      case 'function':
        return this.rangeFunction(rangeStart, rangeEnd, rangeList);
      default:
        return this.rangeValue(rangeStart, rangeEnd, rangeList);
    }
  },
  rangeList: function(rangeStart, rangeEnd, rangeList) {
    var start = Math.min(this.start, this.source.length);
    var end = Math.min(this.end, this.source.length);
    // use slice when range shorter than list length
    if (rangeEnd < this.source.length + 1) {
      return this.source.slice(rangeStart, rangeEnd + 1);
    }
    var length = end - start;
    if (this.oscillate) {
      return this.rangeListOscillate(rangeStart, rangeEnd, rangeList, length, start);
    } else {
      return this.rangeListLoop(rangeStart, rangeEnd, rangeList, length);
    }
  },
  rangeListOscillate: function(rangeStart, rangeEnd, rangeList, length, start) {
    var l = length - 1;
    var l2 = l * 2;
    for (var i = rangeStart; i <= rangeEnd; i++) {
      var index = Math.abs((i+l)%l2-l)+start;
      rangeList.push(this.source[index]);
    }
    return rangeList;
  },
  rangeListLoop: function(rangeStart, rangeEnd, rangeList, length) {
    for (var i = rangeStart; i <= rangeEnd; i++) {
      var index = i % length;
      rangeList.push(this.source[index]);
    }
    return rangeList;
  },
  rangeValue: function(rangeStart, rangeEnd, rangeList) {
    for (var i = rangeStart; i <= rangeEnd; i++) {
      rangeList.push(this.source);
    }
    return rangeList;
  },
  rangeFunction: function(rangeStart, rangeEnd, rangeList) {
    for (var i = rangeStart; i <= rangeEnd; i++) {
      rangeList.push(this.source(i));
    }
    return rangeList;
  }
};

module.exports = Sequence;