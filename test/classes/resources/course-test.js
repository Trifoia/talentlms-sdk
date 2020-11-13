'use strict';

const assert = require('assert').strict;

const testResource = require('../../test-utils/test-resource.js');

const Course = require('../../../src/classes/resources/course.js');
const ResourceBase =require('../../../src/classes/resources/resource-base.js');

describe('course', function() {
  it('should instantiate correctly', async () => {
    const context = {
      testContext: 'textContext'
    };
    const course = new Course(context);
    assert.equal(course._context, context);
    assert.ok(course instanceof ResourceBase);
  });

  it('should create course', async () => {
    const params = {
      name: 'testName'
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'create',
      expectedEndpoint: 'createCourse',
      expectedParams: params,
      params
    });
  });

  it('should retrieve singe course', async () => {
    const params = 1;
    await testResource({
      ResourceClass: Course,
      methodName: 'retrieve',
      expectedEndpoint: 'courses/id:1',
      expectedParams: undefined,
      params
    });
  });

  it('should get all courses', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: Course,
      methodName: 'all',
      expectedEndpoint: 'courses',
      expectedParams: undefined,
      params
    });
  });

  it('should delete course', async () => {
    const params = {
      course_id: 1
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'delete',
      expectedEndpoint: 'deleteCourse',
      expectedParams: params,
      params
    });
  });

  it('should add user to course', async () => {
    const params = {
      user_id: 1,
      course_id: 2
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'addUser',
      expectedEndpoint: 'addUserToCourse',
      expectedParams: params,
      params
    });
  });

  it('should remove user from course', async () => {
    const params = {
      user_id: 1,
      course_id: 2
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'removeUser',
      expectedEndpoint: 'removeUserFromCourse/user_id:1,course_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should get go to course link', async () => {
    const params = {
      user_id: 1,
      course_id: 2,
      logout_redirect: 'testLogoutRedirect',
      course_completed_redirect: 'testCourseCompletedRedirect'
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'goToCourse',
      expectedEndpoint: 'goToCourse/user_id:1,course_id:2,logout_redirect:dGVzdExvZ291dFJlZGlyZWN0,course_completed_redirect:dGVzdENvdXJzZUNvbXBsZXRlZFJlZGlyZWN0',
      expectedParams: undefined,
      params
    });
  });

  it('should get go to course link with array header hidden options', async () => {
    const params = {
      user_id: 1,
      course_id: 2,
      header_hidden_options: ['courseName', 'units', 'sharedFiles']
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'goToCourse',
      expectedEndpoint: 'goToCourse/user_id:1,course_id:2,header_hidden_options:courseName;units;sharedFiles',
      expectedParams: undefined,
      params
    });
  });

  it('should get buy course link', async () => {
    const params = {
      user_id: 1,
      course_id: 2
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'buyCourse',
      expectedEndpoint: 'buyCourse',
      expectedParams: params,
      params
    });
  });

  it('should get user course status', async () => {
    const params = {
      user_id: 1,
      course_id: 2
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'getUserStatus',
      expectedEndpoint: 'getUserStatusInCourse/user_id:1,course_id:2',
      expectedParams: undefined,
      params
    });
  });

  it('should get custom course fields', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: Course,
      methodName: 'getCustomCourseFields',
      expectedEndpoint: 'getCustomCourseFields',
      expectedParams: undefined,
      params
    });
  });

  it('should get course by custom field', async () => {
    const params = {
      custom_field_value: 'testFieldValue'
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'getByCustomField',
      expectedEndpoint: 'getCoursesByCustomField/custom_field_value:testFieldValue',
      expectedParams: undefined,
      params
    });
  });

  it('should reset user progress', async () => {
    const params = {
      user_id: 1,
      course_id: 2
    };
    await testResource({
      ResourceClass: Course,
      methodName: 'resetUserProgress',
      expectedEndpoint: 'resetUserProgress/user_id:1,course_id:2',
      expectedParams: undefined,
      params
    });
  });
});
