const accountClient = require('../app/grpc-clients/account.client');
const assert = require('assert');
const bcrypt = require('bcrypt');
require('should');

const account = {
  username: 'dat',
  password: '123456',
  lastname: 'Pham',
  firstname: 'Quang Dat',
  email: 'quangdat2000.pham@gmail.com'
};

describe('Account gRPC-client', () => {
  describe('CRUD', () => {
    it('should create an account', done => {
      accountClient.start()
        .then(client => {
          client.create({ account }, async (err, response) => {
            assert(response.success, true)
            assert.equal(err, null);
            assert.equal(response.message, 'ACCOUNT_CREATED');
            done();
          });
        });
    });

    it('should get an account with username provided', done => {
      accountClient.start()
        .then(client => {
          client.findByUsername({ username: account.username }, (err, response) => {
            assert.equal(err, null);
            assert.equal(response.message, 'ACCOUNT_FIND_BY_USERNAME');
            assert.equal(response.account.username, account.username);
            done();
          });
      });
    });
  })

  it('should generate an emailVerifyKey', done => {
    accountClient.start()
      .then(client => {
        client.newEmailVerifyKey({ username: account.username }, (err, response) => {
          assert.equal(err, null);
          assert.equal(response.message, 'ACCOUNT_EMAIL_VERIFY_KEY');
          done();
        });
    });
  });
});
