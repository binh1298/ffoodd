const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Update a category', () => {
  it('should update a category', done => {
    mealClient.start().then(({ categoryClient }) => {
      const categoryDefaultRequest = {
        category: {
          id: '5d2603b077104d2b1720242f',
          name: 'Vegan',
          description: 'Vegetables',
          imageUrl: 'Test'
        }
      };
      categoryClient.update(categoryDefaultRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'CATEGORY UPDATED');
        assert(response.category.id, '5d2603b077104d2b1720242f');
        done();
      });
    });
  });
});
