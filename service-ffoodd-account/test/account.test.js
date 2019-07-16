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
        assert.equal(response.message, 'ACCOUNT_FOUND')
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
        assert.equal(response.message, 'ACCOUNT_EMAIL_VERIFY_KEY');
        done();
      });
    });
  })
});
