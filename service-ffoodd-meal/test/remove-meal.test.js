const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client', () => {
  it('should delete a meal object', done => {
    mealClient.start().then(client => {
      const existingMeal = { id: '5d0f90e91a36a9241bad1c3a' };
      client.remove(existingMeal, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
