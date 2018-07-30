var sm = require('service-metadata');
var apim = require('local://isp/policy/apim.custom.js');

if (sm.getVar('var://service/error-subcode') === '0x01d30003'){
  apim.error('validationError',422,'Invalid',sm.getVar('var://service/error-message'));
}
