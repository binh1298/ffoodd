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

        client.createAccount(account, (err, response) => {
          assert(response.message, 'CREATE_ACCOUNT');
          assert(response.account, account);
          done();
        });
      });
  })
});
