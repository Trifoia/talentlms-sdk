'use strict';

const assert = require('assert').strict;

const testResource = require('../../test-utils/test-resource.js');

const User = require('../../../src/classes/resources/user.js');
const ResourceBase = require('../../../src/classes/resources/resource-base.js');

describe('user', function() {
  it('should instantiate correctly', async () => {
    const context = {
      testContext: 'textContext'
    };
    const user = new User(context);
    assert.equal(user._context, context);
    assert.ok(user instanceof ResourceBase);
  });
  
  it('should retrieve a user with an ID', async () => {
    const params = 1;
    await testResource({
      ResourceClass: User,
      methodName: 'retrieve',
      expectedEndpoint: 'users/id:1',
      expectedParams: undefined,
      params
    });
  });

  it('should retrieve a user with an email', async () => {
    const params = {
      email: 'testEmail'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'retrieve',
      expectedEndpoint: 'users/email:testEmail',
      expectedParams: undefined,
      params
    });
  });

  it('should retrieve a user with a username', async () => {
    const params = {
      username: 'testUsername'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'retrieve',
      expectedEndpoint: 'users/username:testUsername',
      expectedParams: undefined,
      params
    });
  });

  it('should get all users', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: User,
      methodName: 'all',
      expectedEndpoint: 'users',
      expectedParams: undefined,
      params
    });
  });

  it('should delete a user', async () => {
    const params = {
      user_id: 1
    };
    await testResource({
      ResourceClass: User,
      methodName: 'delete',
      expectedEndpoint: 'deleteUser',
      expectedParams: params,
      params
    });
  });

  it('should log in a user', async () => {
    const params = {
      login: 'testUsername',
      password: 'testPassword'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'login',
      expectedEndpoint: 'userLogin',
      expectedParams: params,
      params
    });
  });

  it('should log out a user', async () => {
    const params = {
      user_id: 1,
      next: 'testUrl'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'logout',
      expectedEndpoint: 'userLogout',
      expectedParams: params,
      params
    });
  });

  it('should sign up a user', async () => {
    const params = {
      first_name: 'testFirst',
      last_name: 'testLast',
      email: 'testEmail',
      login: 'testLogin'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'signup',
      expectedEndpoint: 'userSignup',
      expectedParams: params,
      params
    });
  });

  it('should get custom registration fields', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: User,
      methodName: 'getCustomRegistrationFields',
      expectedEndpoint: 'getCustomRegistrationFields',
      expectedParams: undefined,
      params
    });
  });

  it('should set user status', async () => {
    const params = {
      user_id: 1,
      status: 'active'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'setStatus',
      expectedEndpoint: 'userSetStatus/user_id:1,status:active',
      expectedParams: undefined,
      params
    });
  });

  it('should trigger forgot username system', async () => {
    const params = {
      email: 'testEmail',
      domain_url: 'testDomainUrl'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'forgotUsername',
      expectedEndpoint: 'forgotUsername/email:testEmail,domain_url:dGVzdERvbWFpblVybA==',
      expectedParams: undefined,
      params
    });
  });

  it('should trigger forgot password system', async () => {
    const params = {
      username: 'testUsername',
      domain_url: 'testDomainUrl',
      redirect_url: 'testRedirectUrl'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'forgotPassword',
      expectedEndpoint: 'forgotPassword/username:testUsername,domain_url:dGVzdERvbWFpblVybA==,redirect_url:dGVzdFJlZGlyZWN0VXJs',
      expectedParams: undefined,
      params
    });
  });

  it('should edit user info', async () => {
    const params = {
      user_id: 1,
      first_name: 'newTestFirst',
      last_name: 'newTestLast'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'edit',
      expectedEndpoint: 'editUser',
      expectedParams: params,
      params
    });
  });

  it('should get users by custom fields', async () => {
    const params = {
      custom_field_value: 'testFieldValue'
    };
    await testResource({
      ResourceClass: User,
      methodName: 'getByCustomField',
      expectedEndpoint: 'getUsersByCustomField/custom_field_value:testFieldValue',
      expectedParams: undefined,
      params
    });
  });
});
