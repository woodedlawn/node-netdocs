/*
 * Module Dependancies
 */
var buildSoap = require('../tools/build-soap')
	, sendSoap = require('../tools/send-soap');

module.exports = function(usr, pwd, fn) {

	var cookies = []
		, soapPath = 'directory.asmx'
		, soapAction = 'Login'
		, soapRequest = '<username>' + usr + '</username>' + 
										'<password>' + pwd + '</password>';

	buildSoap(soapPath, soapAction, soapRequest, function(req, options) {
		sendSoap(req, options, function(res) {
			for (var j in res.headers['set-cookie']) {
				cookies.push(res.headers['set-cookie'][j].split(";")[0]);
			};
			return fn(cookies);
		});
	});

}