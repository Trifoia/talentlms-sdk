'use strict';

const ResourceBase = require('./resource-base.js');
const generateEndpoint = require('../../request/generate-endpoint.js');

class Group extends ResourceBase {
  /**
   * @typedef CreateParams
   * @property {string} name Name of the group
   * @property {string=} description Description of the group
   * @property {string=} key Group access key
   * @property {string|number=} max_redemption Maximum number of times the key can be redeemed
   * @property {string|number=} price Price of group access
   * @property {string=} creator_id ID of the user creating the group
   * 
   * @param {CreateParams} params Group creation parameters
   */
  async create(params) {
    const opts = {endpoint: 'createGroup', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Retrieve a single group
   * 
   * @param {string|number=} id Group ID
   */
  async retrieve(id) {
    const opts = {endpoint: `groups/id:${id}`};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all groups
   */
  async all() {
    const opts = {endpoint: 'groups'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Delete a group
   * 
   * @typedef DeleteParams
   * @property {string|number} group_id ID of the group to be deleted
   * @property {string|number=} deleted_by_user_id ID of the user that deleted the group
   * 
   * @param {DeleteParams} params Deletion parameters
   */
  async delete(params) {
    const opts = {endpoint: 'deleteGroup', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Add a user to a group by redeeming a group key
   * 
   * @typedef AddUserParams
   * @property {string|number} user_id ID of the user to add to the group
   * @property {string|number} group_key The group's access key
   * 
   * @param {AddUserParams} params Add user parameters
   */
  async addUser(params) {
    const opts = {endpoint: generateEndpoint('addUserToGroup', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Remove a user from a group
   * 
   * @typedef RemoveUserParams
   * @property {string|number} user_id ID of the user to add to the group
   * @property {string|number} group_id ID of the group
   *
   * @param {RemoveUserParams} params Remove user parameters
   */
  async removeUser(params) {
    const opts = {endpoint: generateEndpoint('removeUserFromGroup', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Add a course to the group
   * 
   * @typedef AddCourseParams
   * @property {string|number} course_id ID of the course to add to the group
   * @property {string|number} group_id ID of the group
   * 
   * @param {AddCourseParams} params Add course parameters
   */
  async addCourse(params) {
    const opts = {endpoint: generateEndpoint('addCourseToGroup', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }
}

module.exports = Group;
