/* global QUnit */

var Sequence = require('../../../src/data/sequence.js');

var sequence_test = function(){

  QUnit.test( "Sequence", function( assert ) {
    var emptySequence = new Sequence();
    var emptyOutput = emptySequence.range(0, 6);
    assert.deepEqual(emptyOutput, [0, 0, 0, 0, 0, 0, 0], "empty sequence should return all zeros");

    var valueSequence = new Sequence({source:1});
    var valueOutput = valueSequence.range(0,6);
    assert.deepEqual(valueOutput, [1, 1, 1, 1, 1, 1, 1], "value sequence should return all ones");

    var shortLoop = new Sequence({source:[1, 2, 3]});
    var shortLoopOutput = shortLoop.range(0,2);
    assert.deepEqual(shortLoopOutput, [1, 2, 3], "short list sequence should work with loop");

    var loopSequence = new Sequence({source:[1, 2, 3]});
    var loopOutput = loopSequence.range(0, 6);
    assert.deepEqual(loopOutput, [1, 2, 3, 1, 2, 3, 1], "loop sequence should keep looping from beginning");

    var shortOscillate = new Sequence({source:[1, 2, 3], oscillate: true});
    var shortOscillateOutput = shortOscillate.range(0,2);
    assert.deepEqual(shortOscillateOutput, [1, 2, 3], "short list sequence should work with oscillate");

    var oscillateSequence = new Sequence({source:[1, 2, 3], oscillate: true});
    var oscillateOutput = oscillateSequence.range(0, 6);
    assert.deepEqual(oscillateOutput, [1, 2, 3, 2, 1, 2, 3], "oscillate sequence should keep oscillating");

    var functionSequence = new Sequence({source:function(index) { return index; }});
    var functionOutput = functionSequence.range(0, 6);
    assert.deepEqual(functionOutput, [0, 1, 2, 3, 4, 5, 6], "function sequence should return continuous sequence");
  });
};

module.exports = sequence_test;