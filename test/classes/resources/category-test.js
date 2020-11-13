'use strict';

const assert = require('assert').strict;

const testResource = require('../../test-utils/test-resource.js');

const Category = require('../../../src/classes/resources/category.js');
const ResourceBase = require('../../../src/classes/resources/resource-base.js');

describe('category', function() {
  it('should instantiate correctly', async () => {
    const context = {
      testContext: 'textContext'
    };
    const category = new Category(context);
    assert.equal(category._context, context);
    assert.ok(category instanceof ResourceBase);
  });

  it('should retrieve single category', async () => {
    const params = 1;
    await testResource({
      ResourceClass: Category,
      methodName: 'retrieve',
      expectedEndpoint: 'categories/id:1',
      expectedParams: undefined,
      params
    });
  });

  it('should get all categories', async () => {
    const params = undefined;
    await testResource({
      ResourceClass: Category,
      methodName: 'all',
      expectedEndpoint: 'categories',
      expectedParams: undefined,
      params
    });
  });

  it('should get all category children', async () => {
    const params = 1;
    await testResource({
      ResourceClass: Category,
      methodName: 'retrieveLeafsAndCourses',
      expectedEndpoint: 'categoryLeafsAndCourses/id:1',
      expectedParams: undefined,
      params
    });
  });

  it('should get buy category link', async () => {
    const params = {
      user_id: 1,
      category_id: 2
    };
    await testResource({
      ResourceClass: Category,
      methodName: 'buyCategoryCourses',
      expectedEndpoint: 'buyCategoryCourses',
      expectedParams: params,
      params
    });
  });
});
