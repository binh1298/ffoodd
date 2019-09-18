const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Remove a category', () => {
  it('should delete a category object', done => {
    mealClient.start().then(({ categoryClient }) => {
      const requiredIdRequest = { _id: '5d2b6624b7f8ec773b3a95da' };
      categoryClient.remove(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
