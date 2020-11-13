'use strict';

const assert = require('assert').strict;

const testResource = require('../../test-utils/test-resource.js');

const SiteInfo = require('../../../src/classes/resources/site-info.js');
const ResourceBase = require('../../../src/classes/resources/resource-base.js');

describe('site-info', function() {
  it('should instantiate correctly', async () => {
    const context = {
      testContext: 'textContext'
    };
    const siteInfo = new SiteInfo(context);
    assert.equal(siteInfo._context, context);
    assert.ok(siteInfo instanceof ResourceBase);
  });

  it('should get domain info', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: SiteInfo,
      methodName: 'get',
      expectedEndpoint: 'siteInfo',
      expectedParams: undefined,
      params
    });
  });

  it('should get rate limit info', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: SiteInfo,
      methodName: 'getRateLimit',
      expectedEndpoint: 'rateLimit',
      expectedParams: undefined,
      params
    });
  });

  it('should get timeline events', async () => {
    const params = {
      event_type: 'user_login_user'
    };
    await testResource({
      ResourceClass: SiteInfo,
      methodName: 'getTimeline',
      expectedEndpoint: 'getTimeline',
      expectedParams: params,
      params
    });
  });

  it('should get timeline events with additional parameters', async () => {
    const params = {
      event_type: 'user_login_user',
      user_id: 1
    };
    await testResource({
      ResourceClass: SiteInfo,
      methodName: 'getTimeline',
      expectedEndpoint: 'getTimeline',
      expectedParams: params,
      params
    });
  });
});
