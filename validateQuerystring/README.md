This custom policy validates a querystring against a swagger definition.
1. Using DataPower's querystring module to parse request.querystring.
2. Reading the definition (Must be provided as #/definitions/XXXXX) from api.document
3. Settings the definition as JSON Schema in a context var
4. Validate action

Enjoy :)
