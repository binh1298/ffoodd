const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client', () => {
  it('should receive a meal object', done => {
    mealClient.start().then(client => {
      const existingMeal = { id: '5d0f910c4e543824c81f74f3' };
      client.read(existingMeal, async (err, response) => {
        assert(response.id, '5d0f910c4e543824c81f74f3');
        done();
      });
    });
  });
});
