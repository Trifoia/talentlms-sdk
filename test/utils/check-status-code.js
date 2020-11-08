'use strict';

const assert = require('assert');

const checkStatusCode = require('../../src/utils/check-status-code.js');

describe('check-status-code', function() {
  it('should correctly check status codes', async () => {
    for (let i=100; i<600; i++) {
      const result = checkStatusCode(i);
      if (i < 200 || i >= 300) {
        assert.strictEqual(result, false);
      } else {
        assert.strictEqual(result, true);
      }
    }
  });
});
