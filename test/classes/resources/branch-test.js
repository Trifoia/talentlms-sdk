'use strict';

const assert = require('assert').strict;

const testResource = require('../../test-utils/test-resource.js');

const Branch = require('../../../src/classes/resources/branch.js');
const ResourceBase =require('../../../src/classes/resources/resource-base.js');

describe('branch', function() {
  it('should instantiate correctly', async () => {
    const context = {
      testContext: 'textContext'
    };
    const branch = new Branch(context);
    assert.equal(branch._context, context);
    assert.ok(branch instanceof ResourceBase);
  });

  it('should create branch', async () => {
    const params = {
      name: 'testName'
    };
    await testResource({
      ResourceClass: Branch,
      methodName: 'create',
      expectedEndpoint: 'createBranch',
      expectedParams: params,
      params
    });
  });

  it('should retrieve single branch', async () => {
    const params = 1;
    await testResource({
      ResourceClass: Branch,
      methodName: 'retrieve',
      expectedEndpoint: 'branches/id:1',
      expectedParams: undefined,
      params
    });
  });

  it('should get all branches', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: Branch,
      methodName: 'all',
      expectedEndpoint: 'branches',
      expectedParams: undefined,
      params
    });
  });

  it('should delete branch', async () => {
    const params = {
      name: 'testName'
    };
    await testResource({
      ResourceClass: Branch,
      methodName: 'delete',
      expectedEndpoint: 'deleteBranch',
      expectedParams: params,
      params
    });
  });

  it('should add a user to a branch', async () => {
    const params = {
      user_id: 1,
      branch_id: 2
    };
    await testResource({
      ResourceClass: Branch,
      methodName: 'addUser',
      expectedEndpoint: 'addUserToBranch/user_id:1,branch_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should remove a user from a branch', async () => {
    const params = {
      user_id: 1,
      branch_id: 2
    };
    await testResource({
      ResourceClass: Branch,
      methodName: 'removeUser',
      expectedEndpoint: 'removeUserFromBranch/user_id:1,branch_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should add a course to a branch', async () => {
    const params = {
      course_id: 1,
      branch_id: 2
    };
    await testResource({
      ResourceClass: Branch,
      methodName: 'addCourse',
      expectedEndpoint: 'addCourseToBranch/course_id:1,branch_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should set branch status', async () => {
    const params = {
      branch_id: 2,
      status: 'active'
    };
    await testResource({
      ResourceClass: Branch,
      methodName: 'setStatus',
      expectedEndpoint: 'branchSetStatus/branch_id:2,status:active',
      expectedParams: undefined,
      params
    });
  });
});
 