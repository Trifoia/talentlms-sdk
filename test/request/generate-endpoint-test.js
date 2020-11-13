'use strict';

const assert = require('assert').strict;

const generateEndpoint = require('../../src/request/generate-endpoint.js');

describe('generate-endpoint', function() {
  it('should generate simple endpoint', async () => {
    const result = generateEndpoint('testEndpoint');

    assert.equal(result, 'testEndpoint');
  });

  it('should generate endpoint with parameters', async () => {
    const result = generateEndpoint('paramEndpoint', {user_id: 1, example_id: 2, str: 'someString'});

    assert.equal(result, 'paramEndpoint/user_id:1,example_id:2,str:someString');
  });

  it('should base64 encode relevant parameters', async () => {
    const params = {
      logout_redirect: 'logout redirect',
      course_completed_redirect: 'course completed redirect',
      redirect_url: 'redirect url',
      domain_url: 'domain url'
    };

    const result = generateEndpoint('base64Endpoint', params);
    const expected = 'base64Endpoint/' +
      'logout_redirect:bG9nb3V0IHJlZGlyZWN0' +
      ',course_completed_redirect:Y291cnNlIGNvbXBsZXRlZCByZWRpcmVjdA==' + 
      ',redirect_url:cmVkaXJlY3QgdXJs' +
      ',domain_url:ZG9tYWluIHVybA==';

    assert.equal(result, expected);
  });

  it('should automatically join array parameters', async () => {
    const result = generateEndpoint('arrayParams', {arr: ['item1', 'item2']});

    assert.equal(result, 'arrayParams/arr:item1;item2');
  });

  it('should automatically convert boolean parameters to "on" or "off"', async () => {
    const result = generateEndpoint('booleanParams', {onParam: true, offParam: false});

    assert.equal(result, 'booleanParams/onParam:on,offParam:off');
  });
});
