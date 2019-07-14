const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Update a category', () => {
  it('should update a category', done => {
    mealClient.start().then(({ categoryClient }) => {
      const categoryDefaultRequest = {
        category: {
          _id: '5d2b6293c2183b6bcdf32124',
          name: 'Vegan',
          description: 'Vegetables',
          imageUrl: 'Test'
        }
      };
      categoryClient.update(categoryDefaultRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'CATEGORY UPDATED');
        assert(response.category._id, '5d2b6293c2183b6bcdf32124');
        done();
      });
    });
  });
});
