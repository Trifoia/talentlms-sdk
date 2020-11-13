# TalentLMS SDK
Nodejs SDK for accessing the TalentLMS API

This SDK is based off of [version 4.3](https://www.talentlms.com/pages/docs/TalentLMS-API-Documentation.pdf) of the TalentLMS api, and is designed to be an exact replica of the officially supported [PHP Library](http://www.talentlms.com/pages/libraries/php/talentlms-api-php-library.zip)

# Installation
```sh
npm install --save talentlms-sdk
```

# Usage
This library is designed to closely replicate the officially supported PHP Library. The official API documentation can be used to navigate this library, replacing PHP patterns with JavaScript patterns.

## Instantiation
An API key and domain are required when instantiating a new SDK instance. There are other optional fields, including fields for setting rate limits, described in the [TalentOpts](./src/classes/talent-opts.js) class
```js
const TalentLMSSdk = require('talentlms-sdk');
const sdk = new TalentLMSSdk({
  apiKey: 'YOUR-API-KEY',
  domain: 'YOUR-DOMAIN'
});
```

## Resources
The following resources are available:
- [Branch](./src/classes/resources/branch.js)
- [Category](./src/classes/resources/category.js)
- [Course](./src/classes/resources/course.js)
- [Group](./src/classes/resources/group.js)
- [SiteInfo](./src/classes/resources/site-info.js)
- [Unit](./src/classes/resources/unit.js)
- [User](./src/classes/resources/user.js)

See in-line documentation for usage details, or refer to the official API documentation

## Rate Limiting
Automatic rate limiting can be enabled by supplying a `rateLimit` or `ratePercent` member to the SDK constructor. The `rateLimit` value will define a maximum number of requests allowed per hour. The `ratePercent` value will limit the request rate to a percentage (between 0 and 100) of the total number of allowed requests per hour

# Development
## NPM Script Commands
Run all tests
```sh
npm test
```

Run only "quick" tests
```sh
npm run test-quick
```

Lint
```sh
npm run lint
```

Lint and automatically fix issues
```sh
npm run lint-fix
```

## Project Structure
All code should be added to the [src](./src) directory. The structure of the source directory should be replicated in the [test](./test) folder, and all files except for control files should have an associated unit test file that folder

## Unit Testing
This project uses the [Mocha](https://mochajs.org/) library to run unit tests. The principles of "Test Driven Development" should be followed when writing code in this project. That is, unit tests should be leveraged as a development tool and all major functionality should have associated unit tests. Code should be written in a way that allows for easy mocking, either by taking all required instantiated libraries as arguments, or by using an internal state that can be modified externally

### Slow Tests
External resources should generally be mocked when testing to reduce the time it takes for tests to complete. Long running tests can cause development slowdown, since the unit test suite should be run at will whenever updates are made. However that is not always efficient to do. When external libraries or long processes cannot be mocked the [it-slowly](./test/test-utils/it-slowly.js) test utility should be used. By using `itSlowly` in place of `it` within a unit test, the test will automatically be skipped when running unit tests in "quick" mode

## Debugging
This project has built-in utilities for debugging unit tests with VSCode (breakpoints, process stepping, etc). Run the `Mocha` or `Mocha Quick` debug launch configuration to debug all tests or only quick tests respectively

## Configuration
This project uses a standard configuration system that allows for global configuration values to be easily defined and overwritten locally. See the [config](./config.js) file in the root directory for more information (Note: Only applies for package development)

## EcmaScript vs CommonJs
Currently, all Nodejs projects use the CommonJs syntax because ESM modules are still considered "Experimental" as of Nodejs v14.0 and may be subject to breaking changes in future minor version updates. The existing configuration system also requires use of CommonJs and would need to be refactored significantly to support ESM
