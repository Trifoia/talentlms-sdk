'use strict';

const ResourceBase = require('./resource-base.js');

/**
 * Class containing methods for the "Category" resource
 */
class Category extends ResourceBase {
  /**
   * Retrieve a single category
   *
   * @param {string|number} id ID of the category
   */
  async retrieve(id) {
    const opts = {endpoint: `categories/id:${id}`};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all categories
   */
  async all() {
    const opts = {endpoint: 'categories'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all of the children of a given category, along with their courses
   * 
   * @param {string|number} id If od the category
   */
  async retrieveLeafsAndCourses(id) {
    const opts = {endpoint: `categoryLeafsAndCourses/id:${id}`};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get a PayPal link allowing a given user to purchase all courses in a given category as
   * a bundle
   * 
   * @typedef BuyCategoryCoursesParams
   * @property {string|number} user_id ID of the user
   * @property {string|number} category_id ID of the category
   * @property {string=} coupon Code of a coupon to apply to the purchase
   * 
   * @param {BuyCategoryCoursesParams} params Parameters for buying category courses
   */
  async buyCategoryCourses(params) {
    const opts = {endpoint: 'buyCategoryCourses', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }
}

module.exports = Category;
