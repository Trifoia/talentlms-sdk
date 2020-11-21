'use strict';

const assert = require('assert').strict;

const generateRequestOpts = require('../../src/request/generate-request-opts.js');

describe('generate-request-opts', function() {
  it('should generate opts', async () => {
    const opts = {
      apiKey: 'testApiKey',
      domain: 'testDomain'
    };
    const result = generateRequestOpts('testEndpoint', opts);

    assert.equal(result.url, `https://${opts.domain}/api/v1/testEndpoint`);
    assert.equal(result.headers['Content-Type'], 'application/x-www-form-urlencoded');
    assert.equal(result.method, 'GET');

    // Should be able to decode authorization
    let resultApiKey = result.headers.Authorization.split(' ')[1];
    resultApiKey = Buffer.from(resultApiKey, 'base64').toString('utf8').split(':')[0];
    assert.equal(resultApiKey, opts.apiKey);
  });

  it('should generate opts with timeout', async () => {
    const opts = {
      apiKey: 'testApiKey',
      domain: 'testDomain',
      timeout: 1000
    };
    const result = generateRequestOpts('testEndpoint', opts);

    assert.equal(result.url, `https://${opts.domain}/api/v1/testEndpoint`);
    assert.equal(result.timeout, opts.timeout);
    assert.equal(result.headers['Content-Type'], 'application/x-www-form-urlencoded');
    assert.equal(result.method, 'GET');
  });

  it('should encode provided data', async () => {
    const opts = {
      apiKey: 'testApiKey',
      domain: 'testDomain'
    };
    const testData = {
      test1: 'firstArg',
      toEncode: '+:encod\\e th|s'
    };
    const result = generateRequestOpts('testEndpoint', opts, testData);

    assert.equal(result.url, `https://${opts.domain}/api/v1/testEndpoint`);
    assert.equal(result.headers['Content-Type'], 'application/x-www-form-urlencoded');
    assert.equal(result.data, '&test1=firstArg&toEncode=%2B%3Aencod%5Ce%20th%7Cs');
    assert.equal(result.method, 'POST');
  });

  it('should convert booleans in data to "on" and "off"', async () => {
    const opts = {
      apiKey: 'testApiKey',
      domain: 'testDomain'
    };
    const testData = {
      testOff: false,
      testOn: true
    };
    const result = generateRequestOpts('testEndpoint', opts, testData);

    assert.equal(result.data, '&testOff=off&testOn=on');
    assert.equal(result.method, 'POST');
  });

  it('should convert "permanent" boolean to "yes" or "no"', async () => {
    const opts = {
      apiKey: 'testApiKey',
      domain: 'testDomain'
    };
    const testData = {
      permanent: false
    };
    let result = generateRequestOpts('testEndpoint', opts, testData);

    assert.equal(result.data, '&permanent=no');
    assert.equal(result.method, 'POST');

    testData.permanent = true;

    result = generateRequestOpts('testEndpoint', opts, testData);

    assert.equal(result.data, '&permanent=yes');
    assert.equal(result.method, 'POST');
  });
});
