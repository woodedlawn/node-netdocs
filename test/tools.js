/*
 * Module Dependancies
 */
var should = require('should')
	, buildSoap = require('../lib/tools/build-soap')
	, sendSoap = require('../lib/tools/send-soap')
	, parseSoap = require('../lib/tools/send-soap');

describe('tools/', function() {

	describe('build-soap', function() {
		var a = 'path'
			, b = 'action'
			, c = 'request string'
			, str
			, obj
			, rtn;
			
		it('should accept 4 arguments (path, action, request, fn)', function(done) {

			buildSoap(a, b, c, function(d, e) {
				rtn = this;
				str = d;
				obj = e;
				done();
			});

		});


		it('should return the callback function containing the NetDocs soapEnvelope string and the request options object', function() {
			rtn.should.be.an.instanceOf(Object);

			var type = typeof str;
			type.should.be.a('string');

			obj.should.be.a('object');
			obj.host.should.equal('vault.netvoyage.com');
			obj.port.should.equal(443);
			obj.headers.should.be.ok;
		});

	});


	describe('send-soap', function() {
		

		var a = 'test'
			, b = { host: 'www.google.com',	port: 443, headers: '' }
			, res;
		
		it('should accept 3 arguments (soapEnvelope, options, fn)', function(done) {
		
			sendSoap(a, b, function(c) {
				res = c;
				this.should.be.a('object');
				done();
			});
		
		});
		
		it('should return the callback function containing the response object if a cookie is not present in the request options object', function() {		
		
			res.should.be.a('object');
			res.should.have.header('set-cookie');
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
});