'use strict';

/**
 * Extremely simple helper function returns true if a status code is good (in the 200 range)
 * and false otherwise
 * 
 * @param {number} code Status code to check 
 */
const checkStatusCode = (code) => code >= 200 && code < 300;

module.exports = checkStatusCode;
