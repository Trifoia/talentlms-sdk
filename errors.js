'use strict';

/**
 * Error to be used when a method is passed invalid options. Contains an `issues` string
 * array which describes all the invalid options
 */
class InvalidOptsError extends Error {
  constructor(message, issues) {
    super(message);

    this.code = 'ERR_INVALID_OPT_VALUE';
    this.issues = Array.isArray(issues) ? issues : [issues];

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  InvalidOptsError
};
