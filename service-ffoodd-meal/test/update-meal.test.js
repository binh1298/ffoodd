const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client', () => {
  it('should update a meal', done => {
    mealClient.start().then(client => {
      const defaultMeal = {
        id: '5d0f910c4e543824c81f74f3',
        name: 'Chicken Pam',
        description: 'Made by Gordon Ramsey',
        origin: 'Tea party'
      };
      client.updateMeal(defaultMeal, async (err, response) => {
        assert(response.id, false);
        done();
      });
    });
  });
});
