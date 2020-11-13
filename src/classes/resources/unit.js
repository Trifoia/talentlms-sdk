'use strict';

const ResourceBase = require('./resource-base.js');
const generateEndpoint = require('../../request/generate-endpoint.js');

class Unit extends ResourceBase {
  /**
   * Get user progress in a given unit. Omit the `user_id` parameter to get all user progress in
   * the unit
   * 
   * @typedef GetUserProgressParams
   * @property {string|number} unit_id ID of the unit
   * @property {string|number=} user_id ID of a specific user to get progress for
   * 
   * @param {GetUserProgressParams} params Get user progress parameters
   */
  async getUserProgress(params) {
    const opts = {endpoint: generateEndpoint('getUsersProgressInUnits', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get a user's test answers for a given test
   * 
   * @typedef GetTestAnswersParams
   * @property {string|number} test_id ID of the test
   * @property {string|number} user_id ID of the user
   * 
   * @param {GetTestAnswersParams} params Get test answers parameters
   */
  async getTestAnswers(params) {
    const opts = {endpoint: generateEndpoint('getTestAnswers', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get a user's survey answers for a given survey
   * 
   * @typedef GetSurveyAnswersParams
   * @property {string|number} survey_id ID of the survey
   * @property {string|number} user_id ID of the user
   * 
   * @param {GetSurveyAnswersParams} params Get survey answers parameters 
   */
  async getSurveyAnswers(params) {
    const opts = {endpoint: generateEndpoint('getSurveyAnswers', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get the sessions of an instructor led training unit
   * 
   * @typedef GetILTSessionsParams
   * @property {string|number} ilt_id ID of the ILT unit
   * 
   * @param {GetILTSessionsParams} params Get ILT sessions parameters
   */
  async getIltSessions(params) {
    const opts = {endpoint: generateEndpoint('getIltSessions', params)};
    const result = await this._context.apiCall(opts);

    return result.body;
  }
}

module.exports = Unit;
