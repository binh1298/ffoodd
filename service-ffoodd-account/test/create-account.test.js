const accountClient = require('../app/grpc-clients/account.client');
const assert = require('assert');
const bcrypt = require('bcrypt');
require('should');

describe('Account gRPC-client', () => {
  it('should create an account', done => {
    accountClient.start()
      .then(client => {

        const account = {
          username: 'dat',
          password: '123456',
          lastname: 'Pham',
          firstname: 'Quang Dat',
          email: 'quangdat2000.pham@gmail.com'
        };

        client.create(account, async (err, response) => {
          assert(response.success, true)
          assert.equal(err, null);
          assert.equal(response.message, 'CREATE_ACCOUNT');
          account.should.have.property('username', account.username);
          done();
        });
      });
  })
});
