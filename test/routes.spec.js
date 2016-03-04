var expect = require('chai').expect;
var supertest = require('supertest-as-promised');
var app = require('../app');
var agent = supertest.agent(app);
describe('Page routes: ', function() {
  // main page
  describe('GET /', function() {
    it('responds with status code 200', function(done) {
      agent
      .get('/')
      .expect(200)
      .end(done);
    });
  });

  // show all products
  describe('GET /products', function() {
    xit('responds with status code 200', function(done) {
      agent
      .get('/products')
      .expect(200)
      .end(done);
    });
  });

  // show all active products
  describe('GET /products/active', function() {
    xit('responds with status code 200', function(done) {
      agent
      .get('/products/active')
      .expect(200)
      .end(done);
    });
  });

  // get specified item
  describe('GET /products/:itemId', function() {
    xit('responds with status code 200', function(done) {
      agent
      .get('/products/ID') // need to seed database and specify item ID
      .expect(200)
      .end(done);
    });
  });

  // add new item to database
  describe('POST /products', function() {

  });

  // tests to check for item updates in database
  describe('PUT /products/:itemId', function() {

  });



});
