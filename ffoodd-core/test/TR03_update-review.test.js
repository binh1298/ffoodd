const client = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Update a review', () => {
  it('should update a review', done => {
    client.start().then(({ reviewClient }) => {
      const reviewMealRequest = {
        meal_id: '5d2b6334406c706d1809d14e',
        review: {
          _id: '5d2b636607fb1a6d9303039a',
          rating: 1,
          content: 'This meal is terrible'
        }
      };
      reviewClient.update(reviewMealRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'REVIEW UPDATED');
        done();
      });
    });
  });
});
