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
      , b = { host: 'www.google.com', port: 443, headers: '' };
    
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
    
    var a = '<test>test</test>'
      , b = 'test'
      , c = ['test'];
    
    it('should accept 4 arguments (data, action, index, fn)', function(done) {
      parseSoap(a, b, c, function(d) {
        done();
      });
    });
    
    it('should accept an xml string and return json', function(done) {
      parseSoap(a, b, c, function(d) {
        a.should.be.a('string');
        d.should.be.a('object');
        done();
      });
    });
    
    it('should accept a netdocs soap response and return the (soapAction)Response section', function(done) {
      var testResponse = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetAttributesResponse xmlns="http://netdocuments.com/ndApi/"><GetAttributesResult><string>string1</string><string>string2</string></GetAttributesResult></GetAttributesResponse></soap:Body></soap:Envelope>'
        , testAction = 'GetAttributes';
      parseSoap(testResponse, testAction, c, function(d) {
        d.test.should.eql('string1');
        done();
      });
    });
    
    it('should return objects containing key/value pairs generated from index argument and response xml', function(done) {
      var testResponse = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetAttributesResponse xmlns="http://netdocuments.com/ndApi/"><GetAttributesResult><string>string1</string><string>string2</string></GetAttributesResult></GetAttributesResponse></soap:Body></soap:Envelope>'
        , testAction = 'GetAttributes'
        , testIndex = ['test1','test2','test3']
      parseSoap(testResponse, testAction, testIndex, function(d) {
        d.should.have.property('test1', 'string1');
        d.should.have.property('test2', 'string2');
        d.should.not.have.property('test3');
        done();
      });   
    });
  });
  
  describe('nd-soap', function() {

    var a = 'directory.asmx'
      , b = 'Test'
      , c = '<data>string</data>'
      , d = ['test']
      , e = ['test'];
      
    it('should accept 6 arguments (soapPath, soapAction, soapRequest, index, cookies, fn)', function(done) {
      ndSoap(a, b, c, d, e, function(f) {
        done();
      });
    });
    
    it('should return an array of cookies if the Login soapAction is called and no cookies are provided', function(done) {
      ndSoap(a, 'Login', c, d, '', function(f) {
        f.should.be.an.instanceOf(Array);
        done();
      });
    });
    
    it('should return the parsed contents (string or object) of NetDocs response for other soapActions if an array of cookies is supplied', function(done) {
      ndSoap(a, b, c, d, e, function(f) {
        f.should.not.be.an.instanceOf(Array);
        done();
      });
    });
    
  });

});