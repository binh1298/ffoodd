const registerClient = require('../app/grpc-clients/register.client');
const assert = require('assert');

const testRegisterClient = async () => {
  const client = await registerClient.start();
  client.registerServiceProtos({}, (err, response) => {
    describe('Register proto - receive protoFiles from gRPC-server', () => {
      const { protoFiles } = response;

      it('protoFiles should be an array', () => {
        assert.strictEqual(protoFiles.constructor, Array);
      });

      it('protoFiles should have some elements', () => {
        assert.notEqual(protoFiles.length, 0);
      });

      it('properties\'s element of protoFiles should not be empty', () => {
        for (let pf of protoFiles) {
          assert.notEqual(pf.name, '');
          assert.notEqual(pf.content, '');
        }
      });

    });
  });
}

testRegisterClient();
