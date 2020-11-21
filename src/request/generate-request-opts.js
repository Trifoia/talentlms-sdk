'use strict';

const { global } = require('../../config.js');

/**
 * Generates an options object that can be used by the `send` method
 * 
 * @typedef GenerateRequestOptsOpts
 * @property {string} apiKey API Key to use for authentication
 * @property {string} domain Talent LMS domain to use for request
 * @property {number=} timeout Number of milliseconds to wait before timing out
 * 
 * @param {string} endpoint The endpoint to send the request to
 * @param {GenerateRequestOptsOpts} opts Additional configurations
 * @param {object} [data] data to send to TalentLMS
 */
const generateRequestOpts = (endpoint, opts, data = null) => {
  const requestOpts = {
    url: `https://${opts.domain}/api/v1/${endpoint}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: data ? 'POST' : 'GET'
  };

  const key = Buffer.from(unescape(encodeURIComponent(opts.apiKey)) + ':').toString('base64');
  requestOpts.headers.Authorization = `Basic ${key}`;

  if (opts.timeout) requestOpts.timeout = opts.timeout;

  if (data) {
    requestOpts.data = Object.keys(data).reduce((previous, current) => {
      let val = data[current];
      if (typeof val === 'boolean') {
        if (global.yesNoBooleans[current]) {
          val = val ? 'yes' : 'no';
        } else {
          val = val ? 'on' : 'off';
        }
      }
      return `${previous}&${current}=${encodeURIComponent(val)}`;
    }, '');
  }

  return requestOpts;
};

module.exports = generateRequestOpts;
