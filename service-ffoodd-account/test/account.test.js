const accountClient = require('../app/grpc-clients/account.client');
const assert = require('assert');
const bcrypt = require('bcrypt');
require('should');

let client;

const account = {
  username: 'dat',
  password: '123456',
  lastname: 'Pham',
  firstname: 'Quang Dat',
  email: 'quangdat2000.pham@gmail.com'
};

let target_id;

describe('Account gRPC-client', () => {
  before(async () => {
    client = await accountClient.start();
  });

  after(() => {
    client.remove({ _id: account._id }, (err, response) => {
      assert.equal(err, null);
      assert.equal(response.success, true);
      assert.equal(response.message, 'ACCOUNT_REMOVED');
    });
  });

  describe('CRUD', () => {
    it('should create an account', done => {
      client.create({ account }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_CREATED');
        assert.notEqual(response.account, null);
        account._id = response.account._id;
        done();
      });
    });

    it('should find account by _id', done => {
      client.findById({ _id: account._id }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_FOUND');
        assert.notEqual(response.account, null);
        done();
      });
    });

    it('should update account', done => {
      client.update({ _id: account._id, firstname: 'new-firstname', lastname: 'new-lastname' }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_UPDATED');
        done();
      });
    });

    it('should get an account with username provided', done => {
      client.findByUsername({ username: account.username }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_FOUND');
        assert.equal(response.account.username, account.username);
        done();
      });
    });
  })

  describe('Other', () => {
    it('should generate an emailVerifyKey', done => {
      client.newEmailVerifyKey({ username: account.username }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_EMAIL_VERIFY_KEY');
        done();
      });
    });

    it('should update password by _id', done => {
      client.updatePasswordById({ _id: account._id, password: 'new-password' }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_PASSWORD_UPDATED');
        done();
      });
    });

    it('should return roles by _id', done => {
      client.findRolesById({ _id: account._id }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_FIND_ROLES_BY_ID');
        assert.equal(response.roles.constructor, Array);
        done();
      });
    });

    it('should update email by _id', done => {
      client.updateEmailById({ _id: account._id, email: 'new.email@gmail.com' }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_EMAIL_UPDATED');
        done();
      })
    });
  })

  describe('Friend requests', () => {
    it('should send friend request', done => {
      client.create({ account: {
        username: 'target',
        password: 'target',
        lastname: 'FR',
        firstname: 'FR',
        email: 'target@gmail.com'
      }}, (err, response) => {
        target_id = response.account._id;
        client.sendFriendRequest({ sender_id: account._id, target_id }, (err, response) => {
          assert.equal(err, null);
          assert.equal(response.success, true);
          assert.equal(response.message, 'ACCOUNT_SENT_FRIEND_REQUEST');
          done();
        });
      });
    });

    it('should find friend requests', done => {
      client.findFriendRequests({ _id: target_id }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_FIND_FRIEND_REQUESTS');
        assert.equal(response.friendRequests.constructor, Array);
        done();
      });
    });

    it('should find sent friend requests', done => {
      client.findSentFriendRequests({ _id: account._id }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_FIND_SENT_FRIEND_REQUESTS');
        assert.equal(response.sentFriendRequests.constructor, Array);
        done();
      });
    });

    it('should accept friend request', done => {
      client.acceptFriendRequest({ sender_id: account._id, target_id }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_ACCEPT_FRIEND_REQUEST');
        done();
      });
    });    

    it('should remove friend requests', done => {
      client.removeFriendRequest({ sender_id: account._id, target_id }, (err, response) => {
        assert.equal(err, null);
        assert.equal(response.success, true);
        assert.equal(response.message, 'ACCOUNT_REMOVE_FRIEND_REQUEST');
        done();
      });
    });
    
  })

});
