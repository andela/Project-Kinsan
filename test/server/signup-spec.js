  'use strict';
  var expect = require('chai').expect;
  var request = require('request');

  describe('Signup', function () {
    var url = 'http://localhost:3000/api/auth/signup';

    before( function (done) {
      request({url:url, method: 'DELETE', json: {
        name: 'freshclean1'},
        headers: {
          'Content-Type': 'application/json'
        }}, function (err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should connect', function (done) {
      request({url: url, method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }}, function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should have all fields valid', function (done) {
      request({url: url, method: 'POST', json: {
        name: 'tani',
        email: '',
        password: '',
        avatar: 'avatar01'},
        headers: {
          'Content-Type': 'application/json'
        }}, function (err, res, body) {
        if (err) {
          throw err;
        }
        expect(body.message).to.equal('Signup details are incomplete');
        done();
      });
    });

    it('should not register user more than once.', function (done) {
      request({url: url, method: 'POST', json: {
        name: 'lex',
        email: 'lex@lex.com',
        password: 'lexis',
        avatar: 'avatar01'},
        headers: {
          'Content-Type': 'application/json'
        }}, function (err, res, body) {
        if (err) {
          throw err;
        }
        expect(body.message).to.equal('User already exists.');
        done();
      });
    });

    it('should return token on successful registeration', function (done) {
      request({url: url, method: 'POST', json: {
        name: 'freshclean1',
        email: 'freshsoclean1@lex.com',
        password: 'sofreshsoclean1',
        avatar: 'avatar011'},
        headers: {
          'Content-Type': 'application/json'
        }}, function (err, res, body) {
        if (err) {
          throw err;
        }
        expect(body.message).to.equal('You have successfully signed up');
        expect(typeof body.token).to.equal('string');
        done();
      });
    });
  });
