const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client', () => {
  it('should update a meal', done => {
    mealClient.start().then(client => {
      const defaultMeal = {
        id: '5d0f910c4e543824c81f74f3',
        name: 'Chicken Pamesan',
        description: 'Made by Gordon Ramsey',
        origin: 'Tea party'
      };
      client.update(defaultMeal, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'MEAL UPDATED!');
        assert(response.meal.id, '5d0f910c4e543824c81f74f3');
        done();
      });
    });
  });
});
