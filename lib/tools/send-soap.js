/*
 * Module Dependancies
 */
var https = require('follow-redirects').https;

module.exports = function sendSoap(soapEnvelope, options, fn) {
	var body = '';
	var req = https.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			body += chunk;
		});
		res.on('end', function() {

// 			console.log(body);
		
			if (options.headers.Cookie) return fn(body);			
			return fn(this);
		});
	});
	req.write(soapEnvelope);
	req.end();

}