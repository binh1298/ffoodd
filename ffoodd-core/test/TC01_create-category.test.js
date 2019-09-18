const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Create a new Category', () => {
  it('should create a new category', done => {
    mealClient.start().then(({ categoryClient }) => {
      const categoryDefaultRequest = {
        category: {
          name: 'Meat',
          description: 'From Cows',
          imageUrl: 'Not Uploaded'
        }
      };
      categoryClient.create(categoryDefaultRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'CATEGORY CREATED!');
        done();
      });
    });
  });
});
