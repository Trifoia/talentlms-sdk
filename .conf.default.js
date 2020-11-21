'use strict';

/**
 * Default configuration file. Any values also present in the .conf.js file will be
 * overridden. The configurations have two layers
 * 1. Category
 * 2. Value
 * 
 * This system does not support nesting beyond these two layers. Any object value will
 * be replaced with the entire object value in the secret config
 * 
 * All values marked as `undefined` must be defined in the .conf.js file unless the
 * `config.errorOnUndefined` value is set to `false`
 */
module.exports = {
  /**
   * Configuration configurations (yo dawg)
   */
  config: {
    /**
     * If an error should be thrown for `undefined` configuration values
     */
    errorOnUndefined: false
  },

  /**
   * General configuration for Talent LMS
   */
  talent: {
    /**
     * Talent API Key. This value is required to operate the sdk
     */
    apiKey: undefined,

    /**
     * Domain to use for API requests
     */
    domain: undefined,

    /**
     * Number of API calls allowed per hour
     */
    rateLimit: null,

    /**
     * The percentage of the total available rate limit that should be used
     */
    ratePercent: null,

    /**
     * Amount of time in ms to wait for a response before timing out
     */
    timeout: 60000,

    /**
     * Number of times to retry a failed request
     */
    retryCount: 0,

    /**
     * If additional logging should be performed
     */
    verbose: false,
  },

  /**
   * Global configurations that are shared between all TalentLMSSdk instances
   */
  global: {
    /**
     * Endpoint parameters that should be base64 encoded
     */
    base64parameters: {
      logout_redirect: true,
      course_completed_redirect: true,
      redirect_url: true,
      domain_url: true
    },

    /**
     * Booleans that should be converted to "yes" / "no" instead of "on" / "off"
     */
    yesNoBooleans: {
      permanent: true
    }
  }
};
