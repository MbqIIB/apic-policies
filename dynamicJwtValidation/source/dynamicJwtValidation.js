//Import Required Packages
var jwt = require('jwt');
var hm = require('header-metadata');
var sm = require('service-metadata');

// sm.mpgw.skipBackside = true;

// The crypto certificate object name is the same as the client's Id
var clientId = hm.current.get('X-IBM-Client-Id');

// The JWT Token is in the Authorization header, prefixd by 'Bearer '.
var jwtToken = hm.current.get('Authorization').substring(7);

var jwtDecoder = new jwt.Decoder(jwtToken);

jwtDecoder.addOperation('verify', clientId)
    .addOperation('validate', {
      'aud': 'Leumi-Card'
    }).decode(function(error, claims) {
        if (error)
        {
            session.output.write(error);
        } else

        {
            session.output.write(claims);
        }
    })
