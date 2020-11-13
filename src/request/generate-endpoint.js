'use strict';

const { global } = require('../../config.js');

/**
 * Generates an endpoint string for the TalentLMS API
 * 
 * @param {string} base Endpoint base
 * @param {object} params Parameters to apply to the endpoint
 */
const generateEndpoint = (base, params = {}) => {
  let endpoint = base;

  const paramStrings = [];
  for (const key in params) {
    let val = params[key];

    // Convert arrays into strings
    if (Array.isArray(val)) val = val.join(';');

    // Convert booleans into strings
    if (typeof val === 'boolean') val = val ? 'on' : 'off';

    // Check for base64 encoding
    if (global.base64parameters[key]) {
      val = Buffer.from(val).toString('base64');
    }

    paramStrings.push(`${key}:${val}`);
  }

  if (paramStrings.length) endpoint += '/' + paramStrings.join(',');
  return endpoint;
};

module.exports = generateEndpoint;
