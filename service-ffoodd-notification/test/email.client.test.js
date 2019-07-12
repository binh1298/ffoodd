require('dotenv').config();

const assert = require('assert');
const { to } = require('await-to-js');

const emailClient = require('../app/grpc-clients/email.client');

describe('Email client', () => {
  it('Should send an email', function (done) {
    
    this.timeout(5000);

    emailClient.start()
      .then(client => {
        const emailOptions = {
          to: [ 'quangdatdat@gmail.com' ],
          from: 'quangdat2000.pham@gmail.com',
          subject: 'Integrate Sengrid Verification - Client',
          html: 'Integrated - Client'
        };

        client.send(emailOptions, (err, response) => {
          assert.equal(err, null);
          assert.equal(response.success, true);
          assert.equal(response.message, 'EMAIL_SENT');
          done();
        });
      });
  })
});
