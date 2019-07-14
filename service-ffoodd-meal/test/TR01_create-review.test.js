const mealClient = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Review a meal', () => {
  it('should review a meal', done => {
    mealClient.start().then(({ reviewClient }) => {
      const reviewMealRequest = {
        meal_id: '5d260174e68e77262efbfc47',
        review: {
          account_id: 'Test',
          rating: 4,
          content: 'This meal is delicious'
        }
      };
      reviewClient.review(reviewMealRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'REVIEW_CREATED!');
        done();
      });
    });
  });
});
