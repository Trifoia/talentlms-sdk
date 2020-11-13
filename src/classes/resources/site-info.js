'use strict';

const ResourceBase = require('./resource-base.js');

class SiteInfo extends ResourceBase {
  /**
   * Retrieve domain details
   */
  async get() {
    const opts = {endpoint: 'siteInfo'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get API rate limit information
   */
  async getRateLimit() {
    const opts = {endpoint: 'rateLimit'};
    const result = await this._context.apiCall(opts);

    return result.body;
  }

  /**
   * Get timeline events from the TalentLMS API. For event types related to users, courses,
   * branches, groups, or units, and additional parameter can be provided that includes the
   * resource ID to narrow down the results (`user_id`, `course_id`, etc)
   * 
   * @typedef {GetTimelineParams}
   * @property {string} event_type The type of event to gather form the timeline
   * 
   * @param {GetTimelineParams} params Get timeline parameters
   */
  async getTimeline(params) {
    const opts = {endpoint: 'getTimeline', data: params};
    const result = await this._context.apiCall(opts);

    return result.body;
  }
}

module.exports = SiteInfo;
