/*
 * Module Dependancies
 */
var should = require('should');
var nd = require('../');


describe('directory/', function() {

	describe('login', function() {
		var usr = 'username'
			, pwd = 'password'
			, result;

		it('should accept 3 arguments (usr, pwd, fn)', function(done) {

			this.timeout(6000);
		
			nd.directory.login(usr, pwd, function(data) {
				result = data;
				done();
			});
		});
		
	
		it('should return the callback function with an object containing 1 or more cookies', function(){
			result.should.be.a('object');
			result.length.should.be.above(0);
		});

	});
	
	describe('getAttributes', function() {
		var cookies = 'test-cookie'
			, objId = '' //blank for current user
			, attr = ['guid'] //this returns the id of the user object for user 
			, result;

		it('should accept 4 arguments (cookies, objId, attr, fn)', function(done) {

			this.timeout(6000);
		
			nd.directory.getAttributes(cookies, objId, attr, function(data) {
				result = data;
				done();
			});
		});
		
		
	
		it('should return the callback function with an object containing xml data', function(){
			var type = typeof result;
			type.should.be.a('string');
		});

	});
	
});