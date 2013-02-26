/*
 * Module Dependancies
 */
var xml2js = require('xml2js');

module.exports = function(data, action, indices, fn) {
	
	var parser = new xml2js.Parser();

	parser.parseString(data, function(err, result) {
	
		// check for leading xml tag
		var xmlCheck = '<?xml version="1.0" encoding="utf-8"?>';
		if (data.slice(0, xmlCheck.length) == xmlCheck) {
			
			// get body of soap response
			var xmlBody = result['soap:Envelope']['soap:Body'][0];
		
			// check for netdocs fault code
			if (xmlBody['soap:Fault']) {
				// return error info
				return fn(xmlBody['soap:Fault'][0]);
			};
			
			// get contents of response	from (SoapAction)Response element
			var response = xmlBody[action + 'Response'][0]
				, meat;

			// remove namespace variable from the response
			for (var j in response) {
				if (j !== '$') {
					meat = response[j][0].string;
				};
			};
			
			// create response object using indices and meaty part of response
			var resultObject = {};
			
			// for each index in indices
			for (var j in indices) {
				var index = indices[j];

				if (typeof meat[j] === 'string' && meat[j].charAt(0) == '<' && meat[j].charAt(meat[j].length-1) == '>') {

					parser.parseString(meat[j], function(err, result) {
						resultObject[index] = result;						
					});

				} else {
					resultObject[index] = meat[j];
				}
			};
			
			return fn(resultObject);
			};
	});
}
