'use strict';

const assert = require('assert').strict;

const testResource = require('../../test-utils/test-resource.js');

const Group = require('../../../src/classes/resources/group.js');
const ResourceBase =require('../../../src/classes/resources/resource-base.js');

describe('group', function() {
  it('should instantiate correctly', async () => {
    const context = {
      testContext: 'textContext'
    };
    const group = new Group(context);
    assert.equal(group._context, context);
    assert.ok(group instanceof ResourceBase);
  });

  it('should create a group', async () => {
    const params = {
      name: 'Test Group Name'
    };
    await testResource({
      ResourceClass: Group,
      methodName: 'create',
      expectedEndpoint: 'createGroup',
      expectedParams: params,
      params
    });
  });

  it('should retrieve a single group', async () => {
    const params = 1;
    await testResource({
      ResourceClass: Group,
      methodName: 'retrieve',
      expectedEndpoint: 'groups/id:1',
      expectedParams: undefined,
      params
    });
  });

  it('should get all groups', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: Group,
      methodName: 'all',
      expectedEndpoint: 'groups',
      expectedParams: undefined,
      params
    });
  });

  it('should delete a group', async () => {
    const params = {
      group_id: 1
    };
    await testResource({
      ResourceClass: Group,
      methodName: 'delete',
      expectedEndpoint: 'deleteGroup',
      expectedParams: params,
      params
    });
  });

  it('should add a user to a group', async () => {
    const params = {
      user_id: 1,
      group_key: 'test-key'
    };
    await testResource({
      ResourceClass: Group,
      methodName: 'addUser',
      expectedEndpoint: 'addUserToGroup/user_id:1,group_key:test-key',
      expectedParams: undefined,
      params
    });
  });

  it('should remove a user from a group', async () => {
    const params = {
      user_id: 1,
      group_id: 2
    };
    await testResource({
      ResourceClass: Group,
      methodName: 'removeUser',
      expectedEndpoint: 'removeUserFromGroup/user_id:1,group_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should add a course to a group', async () => {
    const params = {
      course_id: 1,
      group_id: 2
    };
    await testResource({
      ResourceClass: Group,
      methodName: 'addCourse',
      expectedEndpoint: 'addCourseToGroup/course_id:1,group_id:2',
      expectedParams: undefined,
      params
    });
  });
});
