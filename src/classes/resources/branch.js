'use strict';

const ResourceBase = require('./resource-base.js');
const generateEndpoint = require('../../request/generate-endpoint.js');

// 'signup_method' => '{signupMethod}',
// 'user_type' => '{userType}',
// 'registration_email_restriction' => '{registrationEmailRestriction}',
// 'users_limit' => '{usersLimit}',
// 'ecommerce_processor' => '{ecommerceProcessor}',
// 'currency' => '{currency}',
// 'paypal_email' => '{paypalEmail}',
// 'ecommerce_subscription' => '{ecommerceSubscription}',
// 'ecommerce_subscription_price' => '{ecommerceSubscriptionPrice}',
// 'ecommerce_subscription_interval' => '{ecommerceSubscriptionInterval}',
// 'ecommerce_credits' => '{ecommerceCredits}',
// 'internal_announcement' => '{internalAnnouncement}',
// 'external_announcement' => '{externalAnnouncement}',
// 'creator_id' => '{creatorId}'

/**
 * Class containing methods for the "Branch" resource
 */
class Branch extends ResourceBase {
  /**
   * Create a new branch
   * 
   * @typedef CreateParams
   * @property {string} name Name of the branch
   * @property {string=} description Description for the branch
   * @property {string|boolean=} disallow_global_login Set to "on" / `true` to prevent users from
   *  logging in from the main TalentLMS domain
   * @property {string|number=} group_id ID of the branch's default group
   * @property {string=} language Language code for the branch
   * @property {string=} timezone Timezone code for the branch
   * @property {string=} signup_method The method by which users can sign up to the branch
   * @property {string=} user_type The default user type
   * @property {string=} registration_email_restriction Email domain to restrict registration to
   * @property {string|number=} users_limit Maximum number of users that can be in the branch
   * @property {string=} ecommerce_processor The ecommerce processor to use for the branch
   * @property {string=} currency Currency payments should be made in
   * @property {string=} paypal_email Email associated with PayPal
   * @property {string|boolean=} ecommerce_subscription Set to "on" / `true` to enable
   *  subscription based access to the branch. Only works with the "Stripe" ecommerce processor
   * @property {string|number=} ecommerce_subscription_price Price for the subscription
   * @property {string=} ecommerce_subscription_interval Interval on which to charge for a
   *  subscription
   * @property {string=} internal_announcement Announcement text to add to users' dashboards
   * @property {string=} external_announcement Announcement text to add to the login page
   * @property {string|number=} creator_id ID of the user that created this branch
   *
   * @param {object} params Parameters for branch creation
   */
  async create(params) {
    const opts = {endpoint: 'createBranch', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Retrieve a single branch
   * 
   * @param {string|number} id Branch ID
   */
  async retrieve(id) {
    const opts = {endpoint: `branches/id:${id}`};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get all branches
   */
  async all() {
    const opts = {endpoint: 'branches'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Delete a branch
   * 
   * @typedef DeleteParams
   * @property {string|number} branch_id ID of the branch to be deleted
   * @property {string|number=} deleted_by_user_id ID of the user that deleted the branch
   * 
   * @param {DeleteParams} params Deletion parameters
   */
  async delete(params) {
    const opts = {endpoint: 'deleteBranch', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Adds a user to a branch
   * 
   * @typedef AddUserParams
   * @property {string|number} user_id ID of the user to add to the branch
   * @property {string|number} branch_id ID of the branch
   * 
   * @param {AddUserParams} params Add user parameters
   */
  async addUser(params) {
    const opts = {endpoint: generateEndpoint('addUserToBranch', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Removes a user from a branch
   *
   * @typedef RemoveUserParams
   * @property {string|number} user_id ID of the user to add to the branch
   * @property {string|number} branch_id ID of the branch
   *
   * @param {RemoveUserParams} params Remove user parameters
   */
  async removeUser(params) {
    const opts = {endpoint: generateEndpoint('removeUserFromBranch', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Add a course to a branch
   * 
   * @typedef AddCourseParams
   * @property {string|number} course_id ID of the course to add to the branch
   * @property {string|number} branch_id ID of the branch
   *
   * @param {AddCourseParams} params Add course parameters
   */
  async addCourse(params) {
    const opts = {endpoint: generateEndpoint('addCourseToBranch', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Set the status of a course
   * 
   * @typedef SetStatusParams
   * @property {string|number} branch_id ID of the branch
   * @property {string} status New branch status. Either 'active' or 'inactive'
   * 
   * @param {SetStatusParams} params Set status parameters
   */
  async setStatus(params) {
    const opts = {endpoint: generateEndpoint('branchSetStatus', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }
}

module.exports = Branch;
