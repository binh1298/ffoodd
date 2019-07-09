/* eslint-env mocha */
const assert = require('assert');
const request = require('supertest');
const status = require('http-status');

const SERVER_ADDRESS = '127.0.0.1:3002';
const agent = request.agent(SERVER_ADDRESS);

describe('Authorization', () => {
  const account = {
    username: 'quangdatpham',
    password: 'dat',
    email: 'quangdatstatus.OK0.pham@gmail.com'
  };

  it('Should signup successfully', done => {
    agent.post('/user/auth/signup')
      .send(account)
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, true);
        assert.notEqual(res.body.token, null);
        done();
      });
  })

  it('Should signin successfully', done => {
    agent.post('/user/auth/signin')
      .send({
        username: account.username,
        password: account.password
      })
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, true);
        assert.notEqual(res.body.token, null);
        done();
      });
  })

  it('Should failed - wrong username - signin', done => {
    agent.post('/user/auth/signin')
      .send({ username: 'wrong' })
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, false);
        assert.equal(res.body.token, null);
        done();
      });
  })

  it('Should failed - wrong password - signin', done => {
    agent.post('/user/auth/signin')
      .send({ password: 'dat' })
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, false);
        assert.equal(res.body.token, null);
        done();
      });
  })

  it('Should failed - empty body - signin', done => {
    agent.post('/user/auth/signin')
      .send({  })
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'ValidationError');
        assert.equal(res.body.token, null);
        done();
      });
  })

  it('Should failed - empty body - signup', done => {
    agent.post('/user/auth/signup')
      .send({  })
      .expect('Content-type', /json/)
      .expect(status.OK)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.success, false);
        assert.equal(res.body.token, null);
      })
  })

  it('Should require jwt token', done => {
    agent.get('/user/profile/')
      .expect('Content-type', /json/)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.status, status.UNAUTHORIZED);
        assert.equal(res.body.success, false);
        assert.equal(res.body.profile, null);
        done();
      })
  })

  it('Should require valid jwt token', done => {
    agent.get('/user/profile/')
      .set('Authorization', 'invalid-token')
      .expect('Content-type', /json/)
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.status, status.UNAUTHORIZED);
        assert.equal(res.body.success, false);
        assert.equal(res.body.profile, null);
        done();
      })
  })
})
