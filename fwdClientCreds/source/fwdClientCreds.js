// This snippet changes the client headers and save the original values into backup headers.
var apic = require('local://isp/policy/apim.custom.js');
var hm = require('header-metadata');

// Read API Connect policy properties
var props = apic.getPolicyProperty();
var origClientIdHeader = props.origClientIdHeader;
var origClientSecretHeader = props.origClientSecretHeader;
var clientIdValue = props.clientIdValue;
var clientSecretValue = props.clientSecretValue;

// Get the original headers values
var originalHeaders = hm.original;
var origClientIdValue = originalHeaders.get('X-IBM-Client-Id');
var origClientSecretValue = originalHeaders.get('X-IBM-Client-Secret');

// The new header names aren't mandatory
if (!origClientIdHeader) {
    origClientIdHeader = 'Original-Client-Id';
};
if (!origClientSecretHeader) {
    origClientSecretHeader = 'Original-Client-Secret';
};

// Set the Headers
var currentHeaders = hm.current;
currentHeaders.set('X-IBM-Client-Id',clientIdValue);
currentHeaders.set(origClientIdHeader,origClientIdValue);

// The client secret value isn't mandtory, any secret related values won't be set if it isn't present
if (clientSecretValue) {
  currentHeaders.set('X-IBM-Client-Secret',clientSecretValue);
  currentHeaders.set(origClientSecretHeader,origClientSecretValue);
};
