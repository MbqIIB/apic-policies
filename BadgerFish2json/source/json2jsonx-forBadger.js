// convert JSON to JSONX [according rfc4627 as convert-http(JSON), not rfc7159]
//
function typestr(json) {
  if (json === null)  return "null";

  switch (typeof json) {
    case "object": return (Array.isArray(json)) ? "array" : "object"; break;
    default:       return typeof json;
  }
}

var suffix=' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.datapower.com/schemas/json jsonx.xsd" xmlns:json="http://www.ibm.com/xmlns/prod/2009/jsonx"';

function toJSONX(json) {
  switch (typestr(json)) {
    case "object": var str = '<json:object' + suffix + '>'; suffix='';
                   Object.keys(json).forEach(function(key) {
                     suffix = ' name="' + key + '"';
                     str += toJSONX(json[key]);
                   });
                   return str + "</json:object>";
                   break;

    case "array":  var str = '<json:array' + suffix + '>'; suffix='';
                   json.forEach(function(item) {
                     str += toJSONX(item);
                   });
                   return str + "</json:array>";
                   break;

    default:       var str = '<json:' + typestr(json) + suffix + '>' +
                             (typestr(json) !== "null" ? json : "") +
                             '</json:' + typestr(json) + '>';
                   suffix = '';
                   return str;
  }
}

session.input.readAsJSON(function(error, json) {
  if (!json || typeof json !== "object") {
    session.reject("no valid JSON according rfc4627");
    return;
  }
  session.output.write( XML.parse( toJSONX(json) ) );
});
