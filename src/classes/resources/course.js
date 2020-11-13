'use strict';

const ResourceBase = require('./resource-base.js');
const generateEndpoint = require('../../request/generate-endpoint.js');

class Course extends ResourceBase {
  /**
   * Create a new course. Custom course fields can be applied by adding items to the parameter
   * object with a key of the form `custom_field_X` where `X` is the id of the custom field
   * 
   * @typedef CreateParams
   * @property {string} name Course name
   * @property {string=} description Course description
   * @property {string=} code Course access code
   * @property {string=} price Course price
   * @property {string|number=} time_limit Time limit to take the course
   * @property {string|number=} category_id ID of the category to place the course
   * @property {string|number=} creator_id ID of the user creating the course
   * 
   * @param {object} params Parameters for course creation
   */
  async create(params) {
    const opts = {endpoint: 'createCourse', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Retrieve a single course
   *
   * @param {string|number} id Course ID
   */
  async retrieve(id) {
    const opts = {endpoint: `courses/id:${id}`};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all courses
   */
  async all() {
    const opts = {endpoint: 'courses'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Delete a course
   * 
   * @typedef DeleteParams
   * @property {string|number} course_id ID of the course to be deleted
   * @property {string|number=} deleted_by_user_id ID of the user that deleted the course
   * 
   * @param {DeleteParams} params Deletion parameters
   */
  async delete(params) {
    const opts = {endpoint: 'deleteCourse', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Add a user to a course. Note that this method will return an array with a single object
   * 
   * @typedef AddUserParams
   * @property {string|number} user_id ID of the user to add to the course
   * @property {string|number} course_id ID of the course
   * @property {string=} role Role to give the user in the course. Can be "learner" or 
   *  "instructor"
   * 
   * @param {AddUserParams} params Add user parameters
   */
  async addUser(params) {
    const opts = {endpoint: 'addUserToCourse', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Remove a user form a course
   * 
   * @typedef RemoveUserParams
   * @property {string|number} user_id ID of the user to add to the course
   * @property {string|number} course_id ID of the course
   *
   * @param {RemoveUserParams} params Remove user parameters
   */
  async removeUser(params) {
    const opts = {endpoint: generateEndpoint('removeUserFromCourse', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get a url that will log a given user in and take them directly to a given course
   * 
   * @typedef GoToCourseParams
   * @property {string|number} user_id ID of the user going to the course
   * @property {string|number} course_id ID of the course
   * @property {string=} logout_redirect URL to redirect the user to when they log out of Talent
   * @property {string=} course_completed_redirect URL to redirect to user to when they complete
   *  the course
   * @property {string[]|string=} header_hidden_options Array or semicolon delimited list of
   *  header items that should be hidden from the user. Valid options are "courseName", "units",
   *  "sharedFiles", "moreOptions", and "certification"
   * 
   * @param {GoToCourseParams} params Go to course parameters
   */
  async goToCourse(params) {
    const opts = {endpoint: generateEndpoint('goToCourse', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get a PayPal link allowing a given user to purchase a course
   * 
   * @typedef BuyCourse
   * @property {string|number} user_id ID of the user
   * @property {string|number} course_id ID of the course
   * @property {string=} coupon Code of a coupon to apply to the purchase
   * 
   * @param {BuyCourse} params Parameters for buying course
   */
  async buyCourse(params) {
    const opts = {endpoint: 'buyCourse', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get a user's current status in a course
   * 
   * @typedef GetUserStatusParams
   * @property {string|number} user_id ID of the user
   * @property {string|number} course_id ID of the course
   * 
   * @param {GetUserStatusParams} params Get user status parameters
   */
  async getUserStatus(params) {
    const opts = {endpoint: generateEndpoint('getUserStatusInCourse', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get a list of the configured custom course fields
   */
  async getCustomCourseFields() {
    const opts = {endpoint: 'getCustomCourseFields'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all courses that have a given custom field value
   * 
   * @typedef GetByCustomFieldParams
   * @property {string} custom_field_value The custom field value to search with
   * 
   * @param {GetByCustomFieldParams} params Get by custom field parameters
   */
  async getByCustomField(params) {
    const opts = {endpoint: generateEndpoint('getCoursesByCustomField', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Reset a user's progress in a course
   * 
   * @typedef ResetUserProgressParams
   * @property {string|number} user_id ID of the user
   * @property {string|number} course_id ID of the course
   * 
   * @param {ResetUserProgressParams} params Reset user progress parameters
   */
  async resetUserProgress(params) {
    const opts = {endpoint: generateEndpoint('resetUserProgress', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }
}

module.exports = Course;
