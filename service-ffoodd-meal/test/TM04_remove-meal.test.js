const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Remove a meal', () => {
  it('should delete a meal object', done => {
    mealClient.start().then(({ mealClient }) => {
      const existingMeal = { id: '5d2606c75f31243291f4d7a1' };
      mealClient.remove(existingMeal, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
