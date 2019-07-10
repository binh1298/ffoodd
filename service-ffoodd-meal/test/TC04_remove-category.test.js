const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Remove a category', () => {
  it('should delete a category object', done => {
    mealClient.start().then(client => {
      const requiredIdRequest = { id: '5d2603b077104d2b1720242f' };
      client.remove(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
