'use strict';

const assert = require('assert').strict;

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
      assert.equal(opts.testOpts1, 'test1');
      assert.equal(opts.testOpts2, 'test2');

      return {
        statusCode: 200,
        body: Buffer.from('valid')
      };
    };

    const result = await send(opts, talent, lib);
    assert.equal(result.statusCode, 200);
    assert.equal(result.body, 'valid');
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
      assert.equal(opts.testOpts1, 'test1');
      assert.equal(opts.testOpts2, 'test2');

      assert.ok(requestCount <= talent.retryCount + 1);

      requestCount++;
      return {
        statusCode: 400,
        body: Buffer.from('invalid')
      };
    };

    const result = await send(opts, talent, lib);
    assert.equal(requestCount, talent.retryCount + 1);
    assert.equal(result.statusCode, 400);
    assert.equal(result.body, 'invalid');
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
      assert.equal(opts.testOpts1, 'test1');
      assert.equal(opts.testOpts2, 'test2');
      assert.equal(opts.timeout, 10);

      assert.ok(requestCount <= talent.retryCount + 1);

      requestCount++;
      await wait(opts.timeout);
      throw new Error('Timeout reached');
    };

    const result = await send(opts, talent, lib);
    assert.equal(requestCount, talent.retryCount + 1);
    assert.equal(result.statusCode, 408);
    assert.equal(result.body.status, 'timeout');
    assert.ok(result.body.timeWaited >= opts.timeout);
    assert.equal(result.body.timeoutMs, opts.timeout);
  });

  it('should perform request without optional options', async () => {
    const requestOpts = {
      testOpts1: 'test1',
      testOpts2: 'test2',
      headers: {}
    };
    const lib = async (opts) => {
      assert.equal(opts.testOpts1, 'test1');
      assert.equal(opts.testOpts2, 'test2');

      return {
        statusCode: 200,
        body: Buffer.from('valid')
      };
    };
    const result = await send(requestOpts, {}, lib);
    assert.equal(result.statusCode, 200);
    assert.equal(result.body, 'valid');
  });

  it('should automatically parse body', async () => {
    const opts = {
      testOpts1: 'test1',
      testOpts2: 'test2',
      headers: {}
    };
    const lib = async (opts) => {
      assert.equal(opts.testOpts1, 'test1');
      assert.equal(opts.testOpts2, 'test2');

      return {
        statusCode: 200,
        body: Buffer.from(JSON.stringify({exampleBody: 'test', aNum: 22}))
      };
    };

    const result = await send(opts, talent, lib);
    assert.equal(result.statusCode, 200);
    assert.equal(result.body.exampleBody, 'test');
    assert.equal(result.body.aNum, 22);
  });
});
