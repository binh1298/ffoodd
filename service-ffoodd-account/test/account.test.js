const accountClient = require('../app/grpc-clients/account.client');
const assert = require('assert');

describe('Account gRPC-client', () => {
  it('should create an account', done => {
    accountClient.start()
      .then(client => {

        const account = {
          username: 'dat',
          password: 'dat'
        };

        client.create(account, (err, response) => {
          assert.equal(err, null);
          assert.equal(response.message, 'CREATE_ACCOUNT');
          assert.deepEqual(response.account, account);
          done();
        });
      });
  })
});
