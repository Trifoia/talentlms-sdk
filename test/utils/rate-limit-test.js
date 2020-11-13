'use strict';

const assert = require('assert');

const itSlowly = require('../test-utils/it-slowly.js');

const {talent} = require('../../config.js');

const rateLimit = require('../../src/utils/rate-limit.js');

const testLimit = 10000;
const timeBetweenRequests = (1000 * 60 * 60) / testLimit;

describe('rate-limit', function() {
  itSlowly('should wait one rate limit period', async () => {
    const startTime = Date.now();
    const opts = Object.assign({}, talent, { rateLimit: testLimit });
    await rateLimit(startTime, opts);

    const endTime = Date.now();
    assert.ok(Math.abs(endTime - (startTime + timeBetweenRequests)) < 10);
  });

  itSlowly('should wait half of one rate limit period', async () => {
    const startTime = Date.now();
    const opts = Object.assign({}, talent, { rateLimit: testLimit });
    await rateLimit(startTime - timeBetweenRequests / 2, opts);

    const endTime = Date.now();
    assert.ok(Math.abs(endTime - (startTime + timeBetweenRequests / 2)) < 10);
  });

  it('should wait no seconds', async () => {
    const startTime = Date.now();
    const opts = Object.assign({}, talent, { rateLimit: testLimit });
    await rateLimit(startTime - timeBetweenRequests, opts);

    const endTime = Date.now();
    assert.ok(Math.abs(endTime - startTime) < 50);
  });
});
