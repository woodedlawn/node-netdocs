module.exports = function buildSoap(path, action, request, fn) {

	var soapPath = '/ndApi/' + path
		, soapAction = 'http://netdocuments.com/ndApi/' + action
		, soapRequest = '<' + action + ' xmlns="http://netdocuments.com/ndApi/">' + request + '</' + action + '>';


 	var soapEnvelope = '<?xml version="1.0" encoding="utf-8"?>' +
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
									 'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
									 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
			'<soap:Body>' + soapRequest + '</soap:Body>' +
		'</soap:Envelope>';
  
  
  var headers = {
		'Content-Type': 'text/xml; charset=utf-8',
		'Content-Length': soapEnvelope.length,
		'SOAPAction': soapAction
	};

	var options = {
		host: 'vault.netvoyage.com',
		port: 443,
		path: soapPath,
		method: 'POST',
		headers: headers
	};
  
	return fn(soapEnvelope, options);
  
}

