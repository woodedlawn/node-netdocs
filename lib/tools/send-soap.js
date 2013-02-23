var https = require('follow-redirects').https;

module.exports = function(soapEnvelope, options, fn) {

	var req = https.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {});
		res.on('end', function() {
			return fn(this);
		});
	});
	req.write(soapEnvelope);
	req.end();

}