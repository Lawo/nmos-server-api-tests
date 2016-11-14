var assert = require('assert');

// Todo: Remove this file again
// This is just to check out some features of mocha and chai.
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
