/*
 * Module Dependancies
 */
var should = require('should');
var buildSoap = require('../lib/tools/build-soap');
var sendSoap = require('../lib/tools/send-soap');

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

			obj.should.be.an.instanceOf(Object);
			obj.host.should.equal('vault.netvoyage.com');
			obj.port.should.equal(443);
		});

	});


	describe('send-soap', function() {
		

		var a = 'test'
			, b = { host: 'www.google.com',	port: 443 }
			, res;
		
		it('should accept 3 arguments (soapEnvelope, options, fn)', function(done) {
		
			sendSoap(a, b, function(c) {
				res = c;
				this.should.be.an.instanceOf(Object);
				done();
			});
		
		});
		
		it('should return the callback function containing the response object', function() {		
		
			res.should.be.an.instanceOf(Object);
			res.should.have.header('set-cookie');
		});

	});
});