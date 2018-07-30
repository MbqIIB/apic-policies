var qs = require('querystring');
var apim = require('local://isp/policy/apim.custom.js');

var querystring = apim.getvariable('request.querystring');
var swagger = apim.getvariable('api.document');
var schemaLocation = apim.getPolicyProperty('schemaLocation');
var schema = swagger[schemaLocation.split('/')[1]][schemaLocation.split('/')[2]];

var validateQuerystring = session.name('validateQuerystring') || session.createContext('validateQuerystring');
validateQuerystring.write(schema);

apim.output('application/json');
session.output.write(qs.parse(querystring));
