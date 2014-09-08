var Sequence = require('../../../src/data/sequence.js');

var sequence_test = function(){

  var sequenceOutput = function(sequence) {
    var output = [];
    for(var i = 0; i < 7; i++) {
      output.push(sequence.next());
    }
    return output;
  }

  QUnit.test( "Sequence", function( assert ) {
    var emptySequence = new Sequence();
    var emptyOutput = sequenceOutput(emptySequence);
    assert.deepEqual( emptyOutput, [0, 0, 0, 0, 0, 0, 0], "empty sequence should return all zeros" );

    var singleSequence = new Sequence([1], Sequence.LOOP);
    var singleOutput = sequenceOutput(singleSequence);
    assert.deepEqual( singleOutput, [1, 1, 1, 1, 1, 1, 1], "single sequence should return all ones" );

    var loopOnceSequence = new Sequence([1, 2, 3], Sequence.LOOP_ONCE);
    var loopOnceOutput = sequenceOutput(loopOnceSequence);
    assert.deepEqual( loopOnceOutput, [1, 2, 3, 3, 3, 3, 3], "loop once sequence should only loop once" );

    var loopSequence = new Sequence([1, 2, 3], Sequence.LOOP);
    var loopOutput = sequenceOutput(loopSequence);
    assert.deepEqual( loopOutput, [1, 2, 3, 1, 2, 3, 1], "loop sequence should keep looping from beginning" );

    var oscillateOnceSequence = new Sequence([1, 2, 3], Sequence.OSCILLATE_ONCE);
    var oscillateOnceOutput = sequenceOutput(oscillateOnceSequence);
    assert.deepEqual( oscillateOnceOutput, [1, 2, 3, 2, 1, 1, 1], "oscillate once sequence should oscillate once" );

    var oscillateSequence = new Sequence([1, 2, 3], Sequence.OSCILLATE);
    var oscillateOutput = sequenceOutput(oscillateSequence);
    assert.deepEqual( oscillateOutput, [1, 2, 3, 2, 1, 2, 3], "oscillate sequence should keep oscillating" );

  });
}

module.exports = sequence_test;