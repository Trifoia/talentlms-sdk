'use strict';

const assert = require('assert');

const calculateRateLimit = require('../../src/utils/calculate-rate-limit.js');

describe('calculate-rate-limit', function() {
  it('should calculate limit', async () => {
    let result = calculateRateLimit({limit: '2000'}, {ratePercent: 80});
    assert.strictEqual(result, 1600);

    result = calculateRateLimit({limit: '5000'}, {ratePercent: 50});
    assert.strictEqual(result, 2500);

    result = calculateRateLimit({limit: '10000'}, {ratePercent: 90});
    assert.strictEqual(result, 9000);
  });

  it('should calculate limit with a string', async () => {
    const result = calculateRateLimit({limit: '2000'}, {ratePercent: 80});
    assert.strictEqual(result, 1600);
  });
});
