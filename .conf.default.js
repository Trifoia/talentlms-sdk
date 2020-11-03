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
};
