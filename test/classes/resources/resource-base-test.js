'use strict';

const assert = require('assert').strict;

const ResourceBase = require('../../../src/classes/resources/resource-base.js');

describe('resource-base', function() {
  it('should instantiate correctly', async () => {
    const context = {
      testOpts: 'testing'
    };
    const actual = new ResourceBase(context);

    assert.equal(actual._context, context);
  });
});
