const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Find a meal by ID', () => {
  it('should receive a meal object', done => {
    mealClient.start().then(client => {
      const requiredIdRequest = { id: '5d1a101a7489da43ec4ffd42' };
      client.findById(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'MEAL FOUNDED!');
        assert(response.meal.id, '5d1a101a7489da43ec4ffd42');
        done();
      });
    });
  });
});
