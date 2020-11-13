'use strict';

/* eslint-disable no-unused-vars */
const ResourceBase = require('../../src/classes/resources/resource-base.js');
/* eslint-enable */

const assert = require('assert').strict;

/**
 * 
 * @typedef TestResourceOpts
 * @property {ResourceBase} ResourceClass Class to test
 * @property {string} methodName Method to test
 * @property {string} expectedEndpoint Final expected endpoint
 * @property {object} expectedParams Final expected parameters
 * @property {object} params Parameter to provided to the class method
 * 
 * @param {TestResourceOpts} param0 Options for resource testing
 */
const testResource = async ({ResourceClass, methodName, expectedEndpoint, expectedParams, params}) => {
  let didCall = false;
  const context = {
    apiCall: (opts) => {
      assert.equal(opts.endpoint, expectedEndpoint);
      assert.equal(opts.data, expectedParams);
      didCall = true;

      return {
        body: {
          isValid: true
        }
      };
    }
  };
  const resource = new ResourceClass(context);

  const result = await resource[methodName](params);
  assert.equal(result.isValid, true);
  assert.equal(didCall, true);
};

module.exports = testResource;
