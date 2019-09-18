const assert = require('assert');
const request = require('supertest');
const status = require('http-status');

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const agent = request.agent(SERVER_ADDRESS);

const account = {
  username: 'dat',
  password: '123456',
  lastname: 'Pham',
  firstname: 'Quang Dat',
  email: 'quangdat2000.pham@gmail.com'
};

let target_id;
let target_token;

describe('Account', () => {
  before(async () => {
    const res = await agent.post('/auth/signup/')
      .send(account);

    agent.set('Authorization', `Bearer ${res.body.token}`);
  });


  describe('Profile', () => {
    it('should find my profile', done => {
      agent.get(`/auth/accounts/`)
        .expect(status.OK)
        .expect('Content-type', /json/)
        .end((err, res) => {
          assert.equal(err, null);
          // assert.equal(res.body.success, true);
          // assert.equal(res.body.message, 'ACCOUNT_FOUND');
          assert.notEqual(res.body.profile, null);
          account._id = res.body.profile._id;
          done();
        });
    });

    it('should update account', done => {
      agent.put('/auth/accounts/')
        .send({ firstname: 'new-firstname', lastname: 'new-lastname' })
        .expect(status.OK)
        .end((err, res) => {
          assert.equal(err, null);
          // assert.equal(res.body.success, true);
          // assert.equal(res.body.message, 'ACCOUNT_UPDATED');
          done();
        });
    });
  })

  describe('Friend requests', () => {
    it('should send friend request', async () => {
      const res0 = await agent.post('/auth/signup')
        .expect(status.OK)
        .send({
          username: 'target',
          password: 'target',
          lastname: 'FR',
          firstname: 'FR',
          email: 'target@gmail.com'
        });

      target_token = res0.body.token;

      const res1 = await request(SERVER_ADDRESS)
        .get(`/auth/accounts/`)
        .set('Authorization', `Bearer ${target_token}`);

      target_id = res1.body.profile._id;

      await agent.patch(`/auth/accounts/sent-fr-reqs/${target_id}`)
        .expect(status.OK);
    });

    it('should find friend requests', done => {
      request(SERVER_ADDRESS)
        .get('/auth/accounts/fr-reqs/')
        .set('Authorization', `Bearer ${target_token}`)
        .expect(status.OK)
        .expect('Content-type', /json/)
        .end((err, res) => {
          assert.equal(err, null);
          // assert.equal(res.body.success, true);
          // assert.equal(res.body.message, 'ACCOUNT_FIND_FRIEND_REQUESTS');
          assert.equal(res.body.friendRequests.constructor, Array);
          assert.equal(res.body.friendRequests.length, 1);
          done();
        });
    });

    it('should find sent friend requests', done => {
      agent.get('/auth/accounts/sent-fr-reqs/')
        .expect(status.OK)
        .expect('Content-type', /json/)
        .end((err, res) => {
          assert.equal(err, null);
          // assert.equal(res.body.success, true);
          // assert.equal(res.body.message, 'ACCOUNT_FIND_SENT_FRIEND_REQUESTS');
          assert.equal(res.body.sentFriendRequests.constructor, Array);
          assert.equal(res.body.sentFriendRequests.length, 1);
          done();
        });
    });

    it('should remove friend requests', done => {
      request(SERVER_ADDRESS)
        .delete(`/auth/accounts/fr-reqs/${account._id}`)
        .set('Authorization', `Bearer ${target_token}`)
        .expect(status.OK)
        .end((err, res) => {
          assert.equal(err, null);
          done();
        });
    });

    it('should remove sent friend requests', done => {
      agent.delete(`/auth/accounts/sent-fr-reqs/${target_id}`)
        .expect(status.OK)
        .end((err, res) => {
          agent.delete(`/auth/accounts/sent-fr-reqs/${target_id}`)
            .expect(status.OK)
            .end((err, res) => {
              assert.equal(err, null);
              // assert.equal(res.body.success, true);
              // assert.equal(res.body.message, 'ACCOUNT_REMOVE_FRIEND_REQUEST');
              done();
            });
        });
    });

    it('should accept friend request', done => {
      request(SERVER_ADDRESS)
        .patch(`/auth/accounts/fr-reqs/${account._id}`)
        .set('Authorization', `Bearer ${target_token}`)
        .expect(status.OK)
        .end((err, res) => {
          agent.patch(`/auth/accounts/fr-reqs/${target_id}`)
            .expect(status.OK)
            .end((err, res) => {
              assert.equal(err, null);
              // assert.equal(res.body.success, true);
              // assert.equal(res.body.message, 'ACCOUNT_ACCEPT_FRIEND_REQUEST');
              done();
            });
        });
    });

  });

    describe('Other', () => {
    it('should generate an emailVerifyKey', done => {
      agent.get('/auth/accounts/email/quangdatpham')
        .expect(status.OK)
        .expect('Content-type', /json/)
        .end((err, res) => {
          assert.equal(err, null);
          // assert.equal(res.body.success, true);
          // assert.equal(res.body.message, 'ACCOUNT_EMAIL_VERIFY_KEY');
          done();
        });
    });

    it('should update password by _id', done => {
      agent.patch('/auth/accounts/password')
        .send({ _id: account._id, password: 'new-password' })
        .expect(status.OK)
        .expect('Content-type', /json/)
        .end((err, res) => {
          assert.equal(err, null);
          // assert.equal(res.body.success, true);
          // assert.equal(res.body.message, 'ACCOUNT_PASSWORD_UPDATED');
          done();
        });
    });

    it('should update email by _id', done => {
      agent.patch('/auth/accounts/email')
        .send({ _id: account._id, email: 'new.email@gmail.com' })
        .expect(status.OK)
        .expect('Content-type', /json/)
        .end((err, res) => {
          assert.equal(err, null);
          // assert.equal(res.body.success, true);
          // assert.equal(res.body.message, 'ACCOUNT_EMAIL_UPDATED');
          done();
        })
    });

  });

});
