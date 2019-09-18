require('dotenv').config();

const assert = require('assert');
const { to } = require('await-to-js');

const email = require('../app/libs/email')({ logger: console });

describe('Email lib', () => {
  it('Should send an email', async function () {
    
    this.timeout(5000);

    const [ err ] = await to(email.send({
      to: 'quangdatdat@gmail.com',
      from: 'quangdat2000.pham@gmail.com',
      subject: 'Integrate Sengrid Verification',
      html: 'Integrated'
    }));
    
    assert.equal(err, null);
    return;
  })
});
