/*
 * Module Dependancies
 */
var should = require('should')
	, buildSoap = require('../lib/tools/build-soap')
	, sendSoap = require('../lib/tools/send-soap')
	, parseSoap = require('../lib/tools/parse-soap')
	, ndSoap = require('../lib/tools/nd-soap');

describe('tools/', function() {

	describe('build-soap', function() {
		var a = 'path'
			, b = 'action'
			, c = 'request string';
			
		it('should accept 4 arguments (path, action, request, fn)', function(done) {

			buildSoap(a, b, c, function(d, e) {
				done();
			});

		});


		it('should return the callback function containing the NetDocs soapEnvelope string and the request options object', function(done) {
		
			buildSoap(a, b, c, function(d, e) {

				this.should.be.a('object');

				var type = typeof d;
				type.should.be.a('string');

				e.should.be.a('object');
				e.host.should.equal('vault.netvoyage.com');
				e.port.should.equal(443);
				e.headers.should.be.ok;
				done();
			});
		});

	});


	describe('send-soap', function() {
		

		var a = 'test'
			, b = { host: 'www.google.com',	port: 443, headers: '' };
		
		it('should accept 3 arguments (soapEnvelope, options, fn)', function(done) {
		
			sendSoap(a, b, function(c) {
				done();
			});
		
		});
		
		it('should return the callback function containing the response object if a cookie is not present in the request options object', function(done) {		
		
			sendSoap(a, b, function(c) {
			
				this.should.be.a('object');
				
				c.should.be.a('object');
				c.should.have.header('set-cookie');
				done();
			});
		});
		
		
		it('should return xml data if a cookie is present in the request options object', function(done) {
		
			b.headers.Cookie = 'test';
			
			sendSoap(a, b, function(c) {
			
				var type = typeof c;
				type.should.be.a('string');
				done();
			});
			
		});
		
	});

	
	describe('parse-soap', function() {
		
		it('should accept 4 arguments (data, action, index, fn)');
		it('should accept an xml string and return json');
		it('should accept a netdocs soap response and return the (soapAction)Response section');
		it('should return objects containing key/value pairs generated from index argument and response xml');
	});
	
	describe('nd-soap', function() {
		
		it('should accept 4 arguments (data, action, index, fn)');
		it('should accept an xml string and return json');
		it('should accept a netdocs soap response and return the (soapAction)Response section');
		it('should return objects containing key/value pairs generated from index argument and response xml');
	});

});