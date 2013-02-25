/*
 * Module Dependancies
 */
var buildSoap = require('../tools/build-soap')
	, sendSoap = require('../tools/send-soap');
	
module.exports = function(cookies, objId, attr, fn) {

	var objectId = objId
		, attrList;
		
	for (var j in attr) {
		attrList += '<string>' + attr[j] + '</string>';
	};
		
	var soapPath = 'directory.asmx'
		, soapAction = 'GetAttributes'
		, soapRequest = '<objId>' + objectId + '</objId>' +
										'<attributeNames>' + attrList + '</attributeNames>';
										
	buildSoap(soapPath, soapAction, soapRequest, function(req, options) {

		//  add cookies to send soap
		options.headers.Cookie = cookies;
	
		sendSoap(req, options, function(data) {
			return fn(data);			
		});
	});

}