const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Remove a meal', () => {
  it('should delete a meal object', done => {
    mealClient.start().then(({ mealClient }) => {
      const existingMeal = { _id: '5d2b6624b7f8ec773b3a95db' };
      mealClient.remove(existingMeal, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
