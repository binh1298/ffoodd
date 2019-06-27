const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client', () => {
  it('should create a new meal', done => {
    mealClient.start().then(client => {
      const defaultMealRequest = {
        meal: {
          name: 'Chicken Pot Pie',
          description: 'Made by a British guy',
          origin: 'Tea party'
        }
      };
      client.create(defaultMealRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'MEAL CREATED!');
        done();
      });
    });
  });
});
