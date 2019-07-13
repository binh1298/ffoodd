/* eslint-env mocha */
const assert = require('assert');
const request = require('supertest');
const status = require('http-status');

const agent = request.agent('127.0.0.1:3002');
const account = { username: 'test', password: 'test' };

describe('Account route', () => {
  before(async () => {
    const res = await agent.post('/user/auth/signup')
      .send(account);

      agent.set('Authorization', `Bearer ${res.body.token}`);
  })

  after(() => {
    // delete account
  });

  it('Should return user profile', done => {
    agent.get('/user/profile/')
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, true);
        assert.notEqual(res.body.profile, null);
        done();
      });
  })  

  it('Should update profile', done => {
    agent.put('/user/profile')
      .send({ firstname: 'firstname', lastname: 'lastname' })
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, true);
        done();
      })
  })

  it('Should update password', done => {
    agent.patch('/user/profile/password')
      .send({ password: 'new-password' })
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, true);

        agent.post('/user/auth/signin')
          .send({ username: account.username, password: 'new-password' })
          .expect('Content-type', /json/)
          .expect(status.OK)
          .end((err, res) => {
            assert.equal(err, null);
            assert.equal(res.body.success, true);
            done();
          });
      })
  })
})
