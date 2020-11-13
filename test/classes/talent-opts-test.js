'use strict';

const assert = require('assert');

const { talent } = require('../../config.js');
const { InvalidOptsError } = require('../../errors.js');

const TalentOpts = require('../../src/classes/talent-opts.js');

describe('talent-opts', function() {
  it('should instantiate with default values', async () => {
    const opts = {
      apiKey: 'someApiKey',
      domain: 'someDomain'
    };
    const result = new TalentOpts(opts);

    assert.strictEqual(result.apiKey, opts.apiKey);
    assert.strictEqual(result.domain, opts.domain);
    assert.strictEqual(result.rateLimit, talent.rateLimit);
    assert.strictEqual(result.ratePercent, talent.ratePercent);
    assert.strictEqual(result.timeout, talent.timeout);
    assert.strictEqual(result.retryCount, talent.retryCount);
    assert.strictEqual(result.verbose, talent.verbose);
  });

  it('should throw an error without required options', async () => {
    const noDomainOpts = {
      apiKey: 'someApiKey'
    };
    assert.throws(() => new TalentOpts(noDomainOpts), InvalidOptsError);

    const noApiKeyOpts = {
      domain: 'someDomain'
    };
    assert.throws(() => new TalentOpts(noApiKeyOpts), InvalidOptsError);

    assert.throws(() => new TalentOpts({}), InvalidOptsError);
    assert.throws(() => new TalentOpts(), InvalidOptsError);
  });
  
  it('should instantiate with all options', async () => {
    const opts = {
      apiKey: 'someApiKey',
      domain: 'someDomain',
      rateLimit: 'someRateLimit',
      ratePercent: 'someRatePercent',
      timeout: 12,
      retryCount: 123,
      verbose: true
    };
    const result = new TalentOpts(opts);

    assert.strictEqual(result.apiKey, opts.apiKey);
    assert.strictEqual(result.domain, opts.domain);
    assert.strictEqual(result.rateLimit, opts.rateLimit);
    assert.strictEqual(result.ratePercent, opts.ratePercent);
    assert.strictEqual(result.timeout, opts.timeout);
    assert.strictEqual(result.retryCount, opts.retryCount);
    assert.strictEqual(result.verbose, opts.verbose);
  });
});
