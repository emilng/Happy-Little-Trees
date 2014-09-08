/// sequence of items with a next item method and looping options

var Sequence = function(list, sequenceType) {
  this.index = 0;
  this.value = 0;
  this.sequenceType = Sequence.SINGLE;
  if (list !== undefined) {
    if (list.length > 1) {
      this.list = list;
      this.sequenceType = (sequenceType !== undefined) ? sequenceType : Sequence.LOOP_ONCE;
    } else {
      this.value = list[0];
    }
  }

  this.direction = 1;
  this.setType(this.sequenceType);
}

// sequence types
Sequence.SINGLE = 0;
Sequence.LOOP_ONCE = 1;
Sequence.LOOP = 2;
Sequence.OSCILLATE_ONCE = 3;
Sequence.OSCILLATE = 4;

Sequence.prototype.setType = function(sequenceType) {
  switch(sequenceType) {
    case Sequence.LOOP_ONCE:
      this.next = this.nextLoopOnce;
      break;
    case Sequence.LOOP:
      this.next = this.nextLoop;
      break;
    case Sequence.OSCILLATE_ONCE:
      this.next = this.nextOscillateOnce;
      break;
    case Sequence.OSCILLATE:
      this.next = this.nextOscillate;
      break;
    case Sequence.SINGLE:
    default:
      this.next = this.nextSingle;
      break;
  }
};

Sequence.prototype.nextSingle = function() {
  return this.value;
};

Sequence.prototype.nextLoopOnce = function() {
  var currentIndex = this.index;
  if (currentIndex < this.list.length - 1) {
    this.index++;
  } else {
    this.index = this.list.length - 1;
  }
  return this.list[currentIndex];
};

Sequence.prototype.nextLoop = function() {
  var currentIndex = this.index;
  if (currentIndex < this.list.length - 1) {
    this.index++;
  } else {
    this.index = 0;
  }
  return this.list[currentIndex];
};

Sequence.prototype.nextOscillateOnce = function() {
  var currentIndex = this.index;
  this.index += this.direction;
  if (this.index === this.list.length) {
    this.index = this.list.length - 2;
    this.direction = -1;
  } else if (this.index === 0) {
    this.direction = 0;
  }
  return this.list[currentIndex];
};

Sequence.prototype.nextOscillate = function() {
  var currentIndex = this.index;
  this.index += this.direction;
  if (this.index === this.list.length) {
    this.index = this.list.length - 2;
    this.direction = -1;
  } else if (this.index === 0) {
    this.direction = 1;
  }
  return this.list[currentIndex];
};

module.exports = Sequence;