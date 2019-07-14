const client = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Update a review', () => {
  it('should update a review', done => {
    client.start().then(({ reviewClient }) => {
      const reviewMealRequest = {
        meal_id: '5d2b3bf792c2ea23761d590e',
        review: {
          id: '5d2b3c1a1378ca24050ddc66',
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
