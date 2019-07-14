const client = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Review a meal', () => {
  it('should review a meal', done => {
    client.start().then(({ reviewClient }) => {
      const reviewMealRequest = {
        meal_id: '5d2b6334406c706d1809d14e',
        review: {
          account_id: 'Test',
          rating: 4,
          content: 'This meal is ok'
        }
      };
      reviewClient.create(reviewMealRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'REVIEW_CREATED');
        done();
      });
    });
  });
});
