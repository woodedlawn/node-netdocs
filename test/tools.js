var should = require('should');

var buildSoap = require('../lib/tools/build-soap');
var sendSoap = require('../lib/tools/send-soap');

describe('tools/', function() {

	describe('build-soap', function() {
			var a = 'path'
				, b = 'action'
				, c = 'request string';
				
			buildSoap(a, b, c, function(d, e) {

				it('should accept 4 arguments (3 variables and a callback function)', function() {});

				it('should return the callback function object', function() {
					this.should.be.an.instanceOf(Object);
				});
			
				it('should contain the NetDocs soapEnvelope string', function() {
					var type = typeof d;
					type.should.be.a('string');
				});
			
				it('should contain the request options object', function() {
					e.should.be.an.instanceOf(Object);
					e.host.should.equal('vault.netvoyage.com');
					e.port.should.equal(443);
				});

			});

	});


	describe('send-soap', function() {
		

		var a = 'test'
			, b = { host: 'www.google.com',	port: 443 }
			, res = [];
		
		it('should accept 3 arguments (2 variables and a callback function)', function(done) {
		
			sendSoap(a, b, function(c) {
				res = c;
				this.should.be.an.instanceOf(Object);
				done();
			});
		
		});
		
		it('should return the callback function object', function() {		
		
			res.should.be.an.instanceOf(Object);
		});
		
		it('should contain the response object', function() {		
		
			res.should.have.header('set-cookie');
		});

	});
});