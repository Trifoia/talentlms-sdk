'use strict';

/**
 * Takes a rate limit and an options object and determines what th
 * 
 * @typedef {object} RatelimitRes
 * @property {string} limit Total rate limit per hour
 * 
 * @typedef {object} CalculateRateLimitOpts
 * @property {number} ratePercent The percentage of the total rate limit to use
 * 
 * @param {RatelimitRes} ratelimitRes Response object from a "ratelimit" request
 * @param {CalculateRateLimitOpts} opts Additional options
 */
const calculateRateLimit = (ratelimitRes , opts) => {
  const limit = Number(ratelimitRes.limit);

  return limit * (opts.ratePercent / 100);
};

module.exports = calculateRateLimit;
