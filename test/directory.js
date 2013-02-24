var should = require('should');


var login = require('../lib/directory/login');


describe('directory/', function() {

	describe('login', function() {
		var usr = 'username'
			, pwd = 'password'
			, result;

		it('should accept 3 arguments (usr, pwd, fn)', function(done) {

			this.timeout(6000);
		
			login(usr, pwd, function(data) {
				result = data;
				done();
			});
		});
		
	
		it('should return the callback function with an object containing 1 or more cookies', function(){
			result.should.be.an.instanceOf(Object);
			result.length.should.be.above(0);
		});

	});
	
});