const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Update a meal', () => {
  it('should update a meal', done => {
    mealClient.start().then(({ mealClient }) => {
      const defaultMeal = {
        _id: '5d2b6334406c706d1809d14e',
        name: 'Chicken Pamesan',
        description: 'Made by Gordon Ramsey',
        origin: 'Tea party'
      };
      mealClient.update(defaultMeal, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'MEAL UPDATED');
        assert(response.meal._id, '5d2b6334406c706d1809d14e');
        done();
      });
    });
  });
});
