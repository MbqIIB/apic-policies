var handleObject = function(obj){
  var keys = Object.keys(obj);
  var nKeys = Object.keys(obj).length;
  var res = {};
  for (var i = 0; i < nKeys; i++) {
    if (typeof(obj[keys[i]]) === 'object') {
      if(Array.isArray(obj[keys[i]]))
      {
        //object is an array
        res[keys[i]]= [];
        var arrkeys = Object.keys(obj[keys[i]]);
        var arrnKeys = Object.keys(obj[keys[i]]).length;
        for(var y=0; y < arrnKeys; y++){
            res[keys[i]][y]= handleObject(obj[keys[i]][y]);
        };
      }
      else if(Object.getOwnPropertyNames(obj[keys[i]])[0]=== '$'){ //check if the object should be string
          res[keys[i]] = obj[keys[i]]['$'];
      }
      else{
      //object is not array and not string
      res[keys[i]] = handleObject(obj[keys[i]]);
    }
   }
     else {
        //string or number
      res = obj[keys[i]];
    }
  }
  return res;
}
var apic = require('local://isp/policy/apim.custom.js')
apic.output('Application/json');
apic.readInputAsJSON(function(err,json){
    session.output.write(handleObject(json));
});
