const accountClient = require('../app/grpc-clients/account.client');
const assert = require('assert');

describe('Reset password', () => {
  it('Should reset password', done => {
    accountClient.start()
      .then(client => {
        client.resetPassword({ username: 'dat', password: 'new', key: 123456 }, (err, response) => {
          assert.equal(err, null);
          assert.equal(response.success, true);
          assert.equal(response.message, 'PASSWORD_RESETTED');
          done();
        });
    });
  });
});
