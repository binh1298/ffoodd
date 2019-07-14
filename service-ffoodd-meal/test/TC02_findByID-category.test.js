const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Find a category by ID', () => {
  it('should receive a category object', done => {
    mealClient.start().then(({ categoryClient }) => {
      const requiredIdRequest = { _id: '5d2b6293c2183b6bcdf32124' };
      categoryClient.findById(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'CATEGORY FOUNDED');
        assert(response.category._id, '5d2b6293c2183b6bcdf32124');
        done();
      });
    });
  });
});
