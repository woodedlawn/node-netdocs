/*
 * Module Dependancies
 */
var buildSoap = require('../tools/build-soap')
	, sendSoap = require('../tools/send-soap')
	, parseSoap = require('../tools/parse-soap');
	
module.exports = function(cookies, objId, attr, fn) {

	var attrList;
		
	for (var j in attr) {
		attrList += '<string>' + attr[j] + '</string>';
	};
	
	// define variables specific to the API call
	var soapPath = 'directory.asmx'
		, soapAction = 'GetAttributes'
		, soapRequest = '<objId>' + objId + '</objId>' +
										'<attributeNames>' + attrList + '</attributeNames>';
										
	// create the soap request
	buildSoap(soapPath, soapAction, soapRequest, function(req, options) {

		//  add cookies to send soap
		options.headers.Cookie = cookies;
	
		// send the soap request
		sendSoap(req, options, function(response) {
		
			// parse the soap response and return an object of key/value pairs
			parseSoap(response, soapAction, attr, function(data) {
				
				// return the data
				return fn(data);
			});
		});
	});

}