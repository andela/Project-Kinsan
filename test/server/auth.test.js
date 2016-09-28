process.env.NODE_ENV = 'development';

const chai = require('chai');
const chai_http = require('chai-http');
const mongoose = require('mongoose');

const server = require('./../../server');
const User = require('./../../app/models/user');
const should = chai.should();

chai.use(chai_http);

describe('Authentication', function() {
  beforeEach(function(done) {
    let user = new User();
    user.username = 'user';
    user.password = 'password';
    user.save((err) => {
      done();
    });
  });

  describe('Login', function() {
    it('should return an error on unsuccessful login', function(done) {
      let user = {
        username : 'user',
        password : 'passwor'
      };

      chai.request(server)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Authentication failed. Wrong password.');
        done();
      });
    });

    it('should return JWT on successful login', function(done) {
      let user = {
        username : 'user',
        password : 'password'
      };

      chai.request(server)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
    });
  });
});
