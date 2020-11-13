'use strict';

const { wait } = require('../../utilities.js');

/**
 * handles rate limiting by pausing operation until the current time has passed the provided
 * last request time plus the configured rate limit
 * 
 * @typedef RateLimitOpts
 * @property {number} rateLimit The number of requests allowed per hour
 * @property {boolean=} verbose If verbose logging should be used (Default false)
 * 
 * @param {number} lastRequestTime Time the last request was sent out
 * @param {RateLimitOpts} opts Talent options
 * 
 * @returns {number} The current time
 */
const rateLimit = async (lastRequestTime, opts) => {
  if (!opts.rateLimit) return Date.now();
  const timeBetweenRequests = (1000 * 60 * 60) / opts.rateLimit;

  const now = Date.now();
  const timeDelta = now - lastRequestTime;
  if (timeDelta < timeBetweenRequests) {
    // We need to wait for our next chance. First set the new last request time to the
    // moment we expect to perform this request
    const waitTime = timeBetweenRequests - timeDelta;
    if (opts.verbose) {
      const currentTime = (new Date(now)).toISOString().split('T')[1];
      const untilTime = (new Date(now + waitTime)).toISOString().split('T')[1];
      console.log(`Rate Limited. Performing next request in ${waitTime}ms. Current time: ${currentTime}. Waiting until ${untilTime}`);
    }
    await wait(waitTime);
  }

  return Date.now();
};

module.exports = rateLimit;
