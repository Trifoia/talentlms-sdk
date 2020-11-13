'use strict';

const assert = require('assert').strict;

const testResource = require('../../test-utils/test-resource.js');

const Unit = require('../../../src/classes/resources/unit.js');
const ResourceBase = require('../../../src/classes/resources/resource-base.js');

describe('unit', function() {
  it('should instantiate correctly', async () => {
    const context = {
      testContext: 'textContext'
    };
    const unit = new Unit(context);
    assert.equal(unit._context, context);
    assert.ok(unit instanceof ResourceBase);
  });

  it('should get user progress', async () => {
    const params = {
      unit_id: 1,
      user_id: 2
    };
    await testResource({
      ResourceClass: Unit,
      methodName: 'getUserProgress',
      expectedEndpoint: 'getUsersProgressInUnits/unit_id:1,user_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should get test answers', async () => {
    const params = {
      test_id: 1,
      user_id: 2
    };
    await testResource({
      ResourceClass: Unit,
      methodName: 'getTestAnswers',
      expectedEndpoint: 'getTestAnswers/test_id:1,user_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should get survey answers', async () => {
    const params = {
      survey_id: 1,
      user_id: 2
    };
    await testResource({
      ResourceClass: Unit,
      methodName: 'getSurveyAnswers',
      expectedEndpoint: 'getSurveyAnswers/survey_id:1,user_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should get ILT sessions', async () => {
    const params = {
      ilt_id: 1
    };
    await testResource({
      ResourceClass: Unit,
      methodName: 'getIltSessions',
      expectedEndpoint: 'getIltSessions/ilt_id:1',
      expectedParams: undefined,
      params
    });
  });
});
