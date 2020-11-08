'use strict';

const TalentOpts = require('./src/classes/talent-opts.js');

class TalentLMSSdk {

  /**
   * Constructor takes Talent LMS Options for initialization. See the TalentOpts class for 
   * details. An error will be thrown if the provided options are invalid
   * 
   * @param {TalentOpts} opts Initialization options
   */
  constructor(opts) {
    if (!(opts instanceof TalentOpts)) opts = new TalentOpts(opts);

    this.opts = opts;

    // this.api
  }
}

module.exports = TalentLMSSdk;