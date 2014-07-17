/*
 * Module Dependancies
 */
var xml2js = require('xml2js');

module.exports = function(data, action, index, fn) {
  
  var parser = new xml2js.Parser();
  
  parser.parseString(data, function(err, result) {
    if (err) {
      console.log(err);
      return err;
    } 
    
    // check for leading xml tag
    var xmlCheck = '<?xml version="1.0" encoding="utf-8"?>';
    if (data.slice(0, xmlCheck.length) == xmlCheck) {
      
      // get body of soap response
      var xmlBody = result['soap:Envelope']['soap:Body'][0];

      // check for netdocs fault code and return error info
      if (xmlBody['soap:Fault']) {
        return fn(xmlBody['soap:Fault'][0]);
      };
      
      // get contents of response from (SoapAction)Response element
      var response = xmlBody[action + 'Response'][0]
        , meat;
        
      //return empty object if only namespace exists
      if (Object.keys(response).length == 1 && response.$) return fn({})

      // ignore namespace variable from the response object
      for (j in response) {
        if (j != '$') {
        
          var rBody = response[j][0];

          // if response is a string, return it
          if (typeof rBody == 'string' && rBody.charAt(0) != '<' && rBody.charAt(rBody.length-1) != '>') {
            return fn(rBody);
          
          // if response is more XML, parse and return it
          } else if (typeof rBody == 'string' && rBody.charAt(0) == '<' && rBody.charAt(rBody.length-1) == '>') {

            parser.parseString(rBody, function(err, result) {
              var stuff = result[Object.keys(result)[0]];
              //console.log('stuff: ', stuff);
              return fn(result);
            });
            
          // if response is an object containing more XML strings, call it meat
          } else {
            meat = rBody[Object.keys(rBody)[0]];
            
            //console.log(meat);
            // if no meat, return an empty object (indicates success)
            if (!meat) return fn({});
      
            // create response object using index and meaty part of response
            var resultObject = {};
      
            // for each index in index
            for (var j in index) {
              var key = index[j];

              if (typeof meat[j] === 'string' && meat[j].charAt(0) == '<' && meat[j].charAt(meat[j].length-1) == '>') {

                parser.parseString(meat[j], function(err, result) {
                  resultObject[key] = result;           
                });

              } else {
                resultObject[key] = meat[j];
              }
            };
      
            return fn(resultObject);
          };
        };
      };
    // no leading xml tag
    } else {
      return fn(result);
    };
  });
}
