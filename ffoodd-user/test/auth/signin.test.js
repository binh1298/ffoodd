/* eslint-env mocha */
const assert = require('assert');
const request = require('supertest');

describe('Auth signin', () => {
  it('Should return token', done => {
    const account = {
      username: 'quangdatpham',
      password: 'dat'
    };

    request('127.0.0.1:3002')
      .post('/user/auth/signin')
      .expect('Content-type', /json/)
      .expect((err, res) => {
        if (err)
         throw err;

        assert.equal(res.body.success, true);
        assert.notEqual(res.body.token, null);
      })
      .expect(200, done);
  })
})
