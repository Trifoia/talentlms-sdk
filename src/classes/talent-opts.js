'use strict';

const config = require('../../config.js');
const { InvalidOptsError } = require('../../errors.js');

/**
 * Special class defines options for the Talent class and it's sub-classes
 */
class TalentOpts {
  constructor(opts = {}) {
    const issues = [];

    /**
     * The API key used to access Talent data. REQUIRED
     */
    this.apiKey = opts.apiKey;
    if (!this.apiKey) issues.push('No "apiKey" option provided to TalentOpts');

    /**
     * Domain to make requests to
     */
    this.domain = opts.domain;
    if (!this.domain) issues.push('No "domain" option provided to TalentOpts');

    /**
     * Optional. The number of API calls allowed per hour. If this and the `ratePercentage`
     * option are not set than no rate limit will be used. If both this and the
     * `ratePercentage` option are set, this value will eventually be overridden
     * with the value determined from the rate percentage
     * 
     * @default null
     */
    this.rateLimit = opts.rateLimit || config.talent.rateLimit;

    /**
     * Optional. Percentage between (0 and 100] of the total available rate limit to use. If
     * set, will use the `ratelimit` endpoint to determine how many api requests should be
     * allowed per hour
     * 
     * @default null
     */
    this.ratePercent = opts.ratePercent || config.talent.ratePercent;

    /**
     * Optional. How long to wait in ms before timing out a request. Will trigger a retry if a
     * retry is available
     * 
     * @default 60000
     */
    this.timeout = opts.timeout || config.talent.timeout;

    /**
     * Optional. Number of additional times to attempt a request before giving up. Set to 0 to
     * disable
     * 
     * @default 2
     */
    this.retryCount = opts.retryCount || config.talent.retryCount;

    /**
     * Flag identifying if verbose logging should be made. Optional
     * 
     * @default false
     */
    this.verbose = opts.verbose || config.talent.verbose;

    if (issues.length) {
      throw new InvalidOptsError(`Found ${issues.length} issues`, issues);
    }
  }
}

module.exports = TalentOpts;