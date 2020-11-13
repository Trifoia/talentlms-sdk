'use strict';

const assert = require('assert').strict;

const phin = require('phin');

const TalentLMSSdk = require('../index.js');

const TalentOps = require('../src/classes/talent-opts.js');

describe('index', function() {
  it('should instantiate correctly', async () => {
    const opts = {
      apiKey: 'testApiKey',
      domain: 'testDomain'
    };
    const sdk = new TalentLMSSdk(opts);

    assert.equal(sdk._opts instanceof TalentOps, true);
    assert.equal(sdk._nextRateCheck, 0);
    assert.equal(sdk._lastRequestTime, 0);
    assert.equal(sdk._request, phin);
  });

  it('should complete apiCall request', async () => {
    const opts = {
      apiKey: 'testApiKey',
      domain: 'testDomain',
      ratePercent: 80
    };
    const sdk = new TalentLMSSdk(opts);

    let didRateLimit, didRequest = false;
    sdk._request = (opts) => {
      if (opts.url === 'https://testDomain/api/v1/rateLimit') {
        didRateLimit = true;
        return {
          statusCode: 200,
          body: Buffer.from(JSON.stringify({
            limit: 2000
          }))
        };
      } else if (opts.url === 'https://testDomain/api/v1/testEndpoint') {
        didRequest = true;
        return {
          statusCode: 200,
          body: Buffer.from(JSON.stringify({
            result: 'valid'
          }))
        };
      } else {
        throw new Error(`Unexpected url: ${opts.url}`);
      }
    };

    const result = await sdk.apiCall({endpoint: 'testEndpoint'});
    assert.equal(result.statusCode, 200);
    assert.equal(result.body.result, 'valid');
    assert.ok(didRateLimit);
    assert.ok(didRequest);
  });

  it('should not run rate limiting on explicit rate limit request', async () => {
    const opts = {
      apiKey: 'testApiKey',
      domain: 'testDomain',
      ratePercent: 80
    };
    const sdk = new TalentLMSSdk(opts);

    let didRequest = false;
    sdk._request = (opts) => {
      if (opts.url == 'https://testDomain/api/v1/rateLimit') {
        if (didRequest === true) {
          throw new Error('Should have only requested rate limit once');
        }
        didRequest = true;
        return {
          statusCode: 200,
          body: Buffer.from(JSON.stringify({
            result: 'valid'
          }))
        };
      } else {
        throw new Error(`Unexpected url: ${opts.url}`);
      }
    };

    const result = await sdk.apiCall({endpoint: 'rateLimit'});
    assert.equal(result.statusCode, 200);
    assert.equal(result.body.result, 'valid');
    assert.ok(didRequest);
  });
});
