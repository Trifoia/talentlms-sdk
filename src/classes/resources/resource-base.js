'use strict';
/** @typedef {import('../../../index')} TalentLMSSdk */

/**
 * Base class used for TalentLMS resources
 */
class ResourceBase {
  /**
   * Instantiates a new resource. Should only be used internally
   * 
   * @param {TalentLMSSdk} context The TalentLMSSdk instance that manages this resource
   */
  constructor(context) {
    /**
     * Parent TalentLMSSdk instance
     * 
     * @private
     * @type TalentLMSSdk
     */
    this._context = context;
  }
}

module.exports = ResourceBase;
