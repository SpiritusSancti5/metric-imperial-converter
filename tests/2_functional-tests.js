/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'l'); 
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input:'32g'})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.text,'invalid unit');
          done();
        });
      });
      
      // double fraction is intentionally valid, so had to change the test
      test('Convert 3/7.2$4kg (invalid number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input:'3/7.2$4kg'})
        .end((err,res )=>{
          assert.equal(res.status,200);
          assert.equal(res.text,'invalid number');
          done();
        });
      });  
      
      test('Convert 3/7.2$4kilomegagram (monkey on a typewriter)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input:'3/7.2$4kilomegagram'})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.text,'monkey on a typewriter');
          done();
        });
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(Number(res.body.returnNum), 2.20462, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
      });
      
    });

  });

});
