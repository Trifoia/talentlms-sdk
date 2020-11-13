'use strict';

const phin = require('phin');

const Branch = require('./src/classes/resources/branch.js');
const Category = require('./src/classes/resources/category.js');
const Course = require('./src/classes/resources/course.js');
const Group = require('./src/classes/resources/group.js');
const SiteInfo = require('./src/classes/resources/site-info.js');
const Unit = require('./src/classes/resources/unit.js');
const User = require('./src/classes/resources/user.js');

const TalentOpts = require('./src/classes/talent-opts.js');
const generateRequestOpts = require('./src/request/generate-request-opts.js');
const send = require('./src/request/send.js');
const calculateRateLimit = require('./src/utils/calculate-rate-limit.js');
const rateLimit = require('./src/utils/rate-limit.js');

class TalentLMSSdk {

  /**
   * Constructor takes Talent LMS Options for initialization. See the TalentOpts class for 
   * details. An error will be thrown if the provided options are invalid
   * 
   * @param {TalentOpts} opts Initialization options
   */
  constructor(opts) {
    if (!(opts instanceof TalentOpts)) opts = new TalentOpts(opts);

    /**
     * Internal options
     * 
     * @private
     * @type TalentOpts
     */
    this._opts = opts;

    /**
     * Unix epoch of the next time the rate limit should be calculated. Only used if rate percent
     * internal option is being used
     * 
     * @private
     * @type number
     */
    this._nextRateCheck = 0;

    /**
     * Unix epoch of the last time a request was made to the TalentLMS API
     * 
     * @private
     * @type number
     */
    this._lastRequestTime = 0;

    /**
     * Function to use for making requests to the TalentLMS API
     * 
     * @private
     * @type function
     */
    this._request = phin;

    this.branch = new Branch(this);
    this.category = new Category(this);
    this.course = new Course(this);
    this.group = new Group(this);
    this.siteInfo = new SiteInfo(this);
    this.unit = new Unit(this);
    this.user = new User(this);
  }

  /**
   * Makes a general request to the TalentLMS API. Should mainly be reserved for internal use,
   * but can be called externally if additional control is required
   * 
   * @typedef ApiCallOpts
   * @property {string} endpoint Endpoint to call
   * @property {object=} data Data to sent to TalentLMS
   * 
   * @param {ApiCallOpts} opts Api call options
   */
  async apiCall({endpoint, data = null}) {
    const now = Date.now();
    if (endpoint !== 'rateLimit' && this._opts.ratePercent && this._nextRateCheck <= now) {
      // Requests to the "rateLimit" endpoint are not rate limited because they do not actually
      // count against the rate limit
      const requestOpts = generateRequestOpts('rateLimit', this._opts);
      const res = await send(requestOpts, this._opts, this._request);

      this._nextRateCheck = parseInt(res.body.reset) * 1000;
      this._opts.rateLimit = calculateRateLimit(res.body, this._opts);
    }

    // Rate limiting
    this._lastRequestTime = await rateLimit(this._lastRequestTime, this._opts);

    const requestOpts = generateRequestOpts(endpoint, this._opts, data);
    const res = await send(requestOpts, this._opts, this._request);

    return res;
  }
}

module.exports = TalentLMSSdk;