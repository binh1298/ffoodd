const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Find a meal by ID', () => {
  it('should receive a meal object', done => {
    mealClient.start().then(({ mealClient }) => {
      const requiredIdRequest = { _id: '5d2b6334406c706d1809d14e' };
      mealClient.findById(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'MEAL FOUNDED');
        assert(response.meal._id, '5d2b6334406c706d1809d14e');
        done();
      });
    });
  });
});
