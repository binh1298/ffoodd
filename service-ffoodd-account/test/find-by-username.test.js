const accountClient = require('../app/grpc-clients/account.client');
const assert = require('assert');

describe('Find by username', () => {
  it('should get an account with username provided', done => {
    accountClient.start()
      .then(client => {
        client.findByUsername({ username: 'dat' }, (err, response) => {
          assert.equal(err, null);
          assert.equal(response.message, 'FIND_BY_USERNAME');
          assert.equal(response.account.username, 'dat');
          done();
        });
    });
  });
});
