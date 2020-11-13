'use strict';

const ResourceBase = require('./resource-base.js');
const generateEndpoint = require('../../request/generate-endpoint.js');

class User extends ResourceBase {
  /**
   * Retrieve a single user. If a string or number are passed to the function than it will be
   * interpreted as an ID. To retrieve a user via email or username, pass an object with an
   * `email` or `username` field respectively
   * 
   * @typedef RetrieveParams
   * @property {string=} email The user's email
   * @property {string=} username The user's username
   * 
   * @param {RetrieveParams|string|number} params User retrieval params or the user ID
   */
  async retrieve(params) {
    const opts = {};
    if (typeof params === 'object') {
      opts.endpoint = generateEndpoint('users', params);
    } else {
      opts.endpoint = `users/id:${params}`;
    }
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all users
   */
  async all() {
    const opts = {endpoint: 'users'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Delete a user
   * 
   * @typedef DeleteParams
   * @property {string|number} user_id ID of the user to be deleted
   * @property {string|number=} deleted_by_user_id ID of the user that deleted the user
   * 
   * @param {DeleteParams} params Deletion parameters
   */
  async delete(params) {
    const opts = {endpoint: 'deleteUser', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Log a user into TalentLMS and retrieve a link that will allow them to directly access the
   * system
   * 
   * @typedef LoginParams
   * @property {string} login The user's username
   * @property {string} password The user's password
   * @property {string=} logout_redirect URL to redirect the user to when they log out
   * 
   * @param {LoginParams} params Login parameters
   */
  async login(params) {
    const opts = {endpoint: 'userLogin', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Retrieve a link that will log the user out of TalentLMS and redirect them to a supplied url
   * 
   * @typedef LogoutParams
   * @property {string|number} user_id ID of the user
   * @property {string} next URL to redirect the user to once they are logged out
   *
   * @param {LogoutParams} params Logout parameters
   */
  async logout(params) {
    const opts = {endpoint: 'userLogout', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Sign up a new user to TalentLMS. Custom registration fields can be applied by adding items
   * to the parameter object with a key of the form `custom_field_X` where `X` is the id of the
   * custom field
   * 
   * @typedef SignupParams
   * @property {string} first_name The user's first name
   * @property {string} last_name The user's last name
   * @property {string} email The user's email address
   * @property {string} login The user's username
   * @property {string} password The user's password
   * @property {string|number=} branch_id ID of a branch the user should be added to
   * @property {string|number=} group_id ID of a group the user should be added to
   * @property {string=} user_type The user type. Valid options are "Administrator",
   *  "Instructor", and "Learner"
   * @property {string|boolean=} restrict_email Set to "on" / `true` to exclude the user from
   *  emails, and leave blank or set to "off" / `false` to allow normal email behavior
   * 
   * 
   * @param {SignupParams} params Signup parameters
   */
  async signup(params) {
    const opts = {endpoint: 'userSignup', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all custom registration fields
   */
  async getCustomRegistrationFields() {
    const opts = {endpoint: 'getCustomRegistrationFields'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Set a user's status
   * 
   * @typedef SetStatusParams
   * @property {string|number} user_id ID of the user
   * @property {string} status The new status for the user. Either "active" or "inactive"
   * 
   * @param {SetStatusParams} params 
   */
  async setStatus(params) {
    const opts = {endpoint: generateEndpoint('userSetStatus', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Trigger an email from TalentLMS to the given user reminding the user of their username
   * 
   * @typedef ForgotUsernameParams
   * @property {string} email The user's email address
   * @property {string=} domain_url The desired domain the email should come from
   *
   * @param {ForgotUsernameParams} params Forgot username parameters
   */
  async forgotUsername(params) {
    const opts = {endpoint: generateEndpoint('forgotUsername', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Trigger an email from TalentLMS to the given user with instructions on how to reset their
   * password
   * 
   * @typedef ForgotPasswordParams
   * @property {string} username The user's username
   * @property {string=} domain_url The desired domain the email should come from
   * @property {string=} redirect_url URL the user should be redirected to once they reset their
   *  password
   * @param {ForgotPasswordParams} params Forgot password parameters
   */
  async forgotPassword(params) {
    const opts = {endpoint: generateEndpoint('forgotPassword', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Edit an existing user's info
   * 
   * @typedef EditParams
   * @property {string|number} user_id ID of the user
   * @property {string=} first_name The user's first name
   * @property {string=} last_name The user's last name
   * @property {string=} email The user's email address
   * @property {string=} login The user's username
   * @property {string=} password The user's password
   * @property {string=} bio The user's biography blurb
   * @property {string=} user_type The user type. Valid options are "Administrator",
   *  "Instructor", and "Learner"
   * @property {string|boolean=} restrict_email Set to "on" / `true` to exclude the user from
   *  emails, and leave blank or set to "off" / `false` to allow normal email behavior
   * 
   * @param {EditParams} params Edit parameters
   */
  async edit(params) {
    const opts = {endpoint: 'editUser', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all users that have a give custom registration fields value
   * 
   * @typedef GetByCustomFieldParams
   * @property {string} custom_field_value The custom field value to search with
   * 
   * @param {GetByCustomFieldParams} params Get by custom field parameters
   */
  async getByCustomField(params) {
    const opts = {endpoint: generateEndpoint('getUsersByCustomField', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }
}

module.exports = User;
