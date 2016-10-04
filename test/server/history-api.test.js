var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');

describe('History', function () {
  describe('/api/user/:id/history endpoint', function () {
    it('should respond with status code of 200', function (done) {
      api.get('/api/users/57ea45dd18be84c20f000001/history')
      .set('Accept', 'application/json')
      .expect(200, done);
    });

    it('should respond with an array of json objects', function (done) {
      api.get('/api/users/57ea45dd18be84c20f000001/history')
      .set('Accept', 'appliction/json')
      .end(function (err, res){
        expect(Array.isArray(res.body)).to.be.equal(true);
        done();
      });
    });

    it('response array contains objects with keys and values', function (done) {

      function checkProperty(array, propertyName) {
        for (var i = 0; i < array.length; i++){
          expect(array[i]).to.have.property(propertyName);
        }
      }

      api.get('/api/users/57ea45dd18be84c20f000001/history')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        checkProperty(res.body, 'gameId');
        checkProperty(res.body, 'completed');
        checkProperty(res.body, 'winner');
        checkProperty(res.body, 'players');

        // it should populate players with the name property
        checkProperty(res.body[0].players, 'name');
        done();
      });
    });
  });

  describe('/api/history  endpoint', function () {
    var data =  {
      'gameId': 'qwerty1237k',
      'players': [
        '57e96f012206d8884e000001',
        '57f2454ae37936dd5c000001',
        '57f24564e37936dd5c000002'
      ],
      'completed': true,
      'winner': '57e96f012206d8884e000001'
    };
    it('should respond with status code 200', function (done) {
      api.post('/api/history')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(data)
      . expect(200, done);
    });

    it('should create new game history', function (done) {
      api.post('/api/history')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(data)
      .end(function (err, res) {
        expect(res.body.gameId).to.equal('qwerty1237k');
        expect(res.body.winner).to.equal('57e96f012206d8884e000001');
        expect(res.body.completed).to.equal(true);
        expect(Array.isArray(res.body.players)).to.equal(true);
        done();
      });
    });

  });
});
