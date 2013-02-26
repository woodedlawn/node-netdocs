/*
 * Module Dependancies
 */
var ndSoap = require('./tools/nd-soap')
	, soapPath = 'directory.asmx';

/*
 * 
 */
exports.getAttributes = function(cookies, objId, aAttr, fn) {

	var attrList;
	
	for (var j in aAttr) {
		attrList += '<string>' + aAttr[j] + '</string>';
	};
	
	// define variables specific to the API call
	var soapAction = 'GetAttributes'
		, soapRequest = '<objId>' + objId + '</objId>' +
										'<attributeNames>' + attrList + '</attributeNames>';
										
	// send the request
	ndSoap(soapPath, soapAction, soapRequest, aAttr, cookies, function(response) {
		return fn(response);
	});
}

/*
 * 
 */
exports.setAttributes = function(cookies, objId, oAttr, fn) {

	var attrList
		, valList;
		
	for (name in oAttr) {
		attrList += '<string>' + name + '</string>';
		valList += '<string>' + oAttr[name] + '</string>';
	};
	
	// define variables specific to the API call
	var soapAction = 'SetAttributes'
		, soapRequest = '<objId>' + objId + '</objId>' +
										'<attributeNames>' + attrList + '</attributeNames>' +
										'<attributeValues>' + valList + '</attributeValues>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, oAttr, cookies, function(response) {
		return fn(response);
	});
}

/*
 * 
 */
 