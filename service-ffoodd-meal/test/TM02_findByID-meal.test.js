const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Find a meal by ID', () => {
  it('should receive a meal object', done => {
    mealClient.start().then(({ mealClient }) => {
      const requiredIdRequest = { id: '5d26027912ecbc27e0cd43c3' };
      mealClient.findById(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'MEAL FOUNDED');
        assert(response.meal.id, '5d26027912ecbc27e0cd43c3');
        done();
      });
    });
  });
});
