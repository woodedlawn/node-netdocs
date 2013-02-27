/*
 * Module Dependancies
 */
var ndSoap = require('./tools/nd-soap')
	, soapPath = 'directory.asmx';

/*
 *  Login
 */
exports.login = function(usr, pwd, fn) {

	var soapAction = 'Login'
		, soapRequest = '<username>' + usr + '</username>' + 
										'<password>' + pwd + '</password>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, {}, false, function(response) {
		return fn(response);
	});
}

/*
 *   GetAttributes
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
 *   SetAttributes
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


 