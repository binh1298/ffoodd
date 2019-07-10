const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Find a category by ID', () => {
  it('should receive a category object', done => {
    mealClient.start().then(({ categoryClient }) => {
      const requiredIdRequest = { id: '5d2603b077104d2b1720242f' };
      categoryClient.findById(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'CATEGORY FOUNDED');
        assert(response.category.id, '5d2603b077104d2b1720242f');
        done();
      });
    });
  });
});
