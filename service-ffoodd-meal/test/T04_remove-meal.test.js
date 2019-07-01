const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Remove a meal', () => {
  it('should delete a meal object', done => {
    mealClient.start().then(client => {
      const existingMeal = { id: '5d1a142f1d199e3f2ccca348' };
      client.remove(existingMeal, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
