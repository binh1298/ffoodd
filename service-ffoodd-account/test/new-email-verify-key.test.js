const accountClient = require('../app/grpc-clients/account.client');
const assert = require('assert');

describe('New email verify key', () => {
  it('should generate an emailVerifyKey', done => {
    accountClient.start()
      .then(client => {
        client.newEmailVerifyKey({ username: 'dat' }, (err, response) => {
          assert.equal(err, null);
          assert.equal(response.message, 'EMAIL_VERIFY_KEY');
          done();
        });
    });
  });
});
