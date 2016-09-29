(function () {
  'use strict';
  var expect = require('chai').expect;
  var request = require('request');
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiJzYW1wbGUiLCJuYW1lIjoidXNlciIsIl9pZCI6IjU3ZWJhZjYwYzc3NDhhMzg0MzZlMWI3MSJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTQ3NTA2NTQ0NywiZXhwIjoxNDc1MTUxODQ3fQ.TleJIly8m1RHNIFGSdLjLECC0QfGLInq0xBMf65bC64';

  describe('Signup', function () {
    var url = 'http://localhost:3000/api/auth/signup';

    before( function (done) {
      request({url:url, method: 'DELETE', json: {
        name: 'freshclean1'},
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
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
          'Content-Type': 'application/json',
          'x-access-token': token
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
          'Content-Type': 'application/json',
          'x-access-token': token
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
          'Content-Type': 'application/json',
          'x-access-token': token
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
          'Content-Type': 'application/json',
          'x-access-token': token
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

}());
