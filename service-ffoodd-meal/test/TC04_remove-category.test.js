const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Remove a category', () => {
  it('should delete a category object', done => {
    mealClient.start().then(({ categoryClient }) => {
      const requiredIdRequest = { id: '5d284d51fe3906191fae798b' };
      categoryClient.remove(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
