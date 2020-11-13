'use strict';

const {cloneDeep} = require('lodash');
const phin = require('phin');

const checkStatusCode = require('../utils/check-status-code.js');

/**
 * Wrapper for the phin request library that adds automatic retries and additional logging. This
 * method will also automatically parse the response body
 *
 * @typedef SendOpts
 * @property {boolean=} verbose If verbose logging should be performed
 * @property {number=} retryCount The number of times to retry timed out requests
 * 
 * @param {object} requestOpts Phin options
 * @param {SendOpts} opts Additional options for extra functionality
 * @param {phin} [requestLib] Request library. Only used for testing
 */
const send = async (requestOpts, opts, requestLib = phin) => {
  let retries = 0;
  let response;

  do {
    if (opts.verbose) {
      if (retries > 0) {
        console.log(`Received status code ${response.statusCode}. Retrying ${retries} / ${opts.retryCount}`);
      }
      // In verbose mode, log the request options while obscuring the api key
      const logOpts = cloneDeep(requestOpts);
      logOpts.headers.Authorization = 'SECRET';
      console.log(`Sending request with options: ${JSON.stringify(logOpts)}`);
    }

    const startTime = Date.now();
    try {
      response = await requestLib(requestOpts);

      // Attempt to parse the body
      response.body = response.body.toString();
      try {
        response.body = JSON.parse(response.body);
      } catch(e) {
        // Allow failure, keep the body as a string
      }
    } catch(e) {
      if (e.message !== 'Timeout reached') throw e;

      // There was a timeout, construct the expected timeout body
      response = {
        statusCode: 408,
        body: {
          status: 'timeout',
          timeWaited: Date.now() - startTime,
          timeoutMs: requestOpts.timeout
        }
      };
    }
  } while (++retries <= opts.retryCount && !checkStatusCode(response.statusCode));

  return response;
};

module.exports = send;
