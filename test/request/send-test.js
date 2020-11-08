'use strict';

const assert = require('assert');

const { talent } = require('../../config.js');
const { wait } = require('../../utilities.js');

const send = require('../../src/request/send.js');


describe('send', function() {
  it('should send basic request', async () => {
    const opts = {
      testOpts1: 'test1',
      testOpts2: 'test2',
      headers: {}
    };
    const lib = async (opts) => {
      assert.strictEqual(opts.testOpts1, 'test1');
      assert.strictEqual(opts.testOpts2, 'test2');

      return {
        statusCode: 200,
        body: 'valid'
      };
    };

    const result = await send(opts, talent, lib);
    assert.strictEqual(result.statusCode, 200);
    assert.strictEqual(result.body, 'valid');
  });

  it('should retry the configured amount', async () => {
    const opts = {
      testOpts1: 'test1',
      testOpts2: 'test2',
      headers: {}
    };

    // Assuming 2 retries, there should ultimately be 3 requests made, the original
    // request and then 2 retries
    let requestCount = 0;
    const lib = async (opts) => {
      assert.strictEqual(opts.testOpts1, 'test1');
      assert.strictEqual(opts.testOpts2, 'test2');

      assert.ok(requestCount <= talent.retryCount + 1);

      requestCount++;
      return {
        statusCode: 400,
        body: 'invalid'
      };
    };

    const result = await send(opts, talent, lib);
    assert.strictEqual(requestCount, talent.retryCount + 1);
    assert.strictEqual(result.statusCode, 400);
    assert.strictEqual(result.body, 'invalid');
  });

  it('should handle timeout properly', async () => {
    const opts = {
      testOpts1: 'test1',
      testOpts2: 'test2',
      headers: {},
      timeout: 10
    };

    // Assuming 2 retries, there should ultimately be 3 requests made, the original
    // request and then 2 retries
    let requestCount = 0;
    const lib = async (opts) => {
      assert.strictEqual(opts.testOpts1, 'test1');
      assert.strictEqual(opts.testOpts2, 'test2');
      assert.strictEqual(opts.timeout, 10);

      assert.ok(requestCount <= talent.retryCount + 1);

      requestCount++;
      await wait(opts.timeout);
      throw new Error('Timeout reached');
    };

    const result = await send(opts, talent, lib);
    assert.strictEqual(requestCount, talent.retryCount + 1);
    assert.strictEqual(result.statusCode, 408);
    assert.strictEqual(result.body.status, 'timeout');
    assert.ok(result.body.timeWaited >= opts.timeout);
    assert.strictEqual(result.body.timeoutMs, opts.timeout);
  });
});
