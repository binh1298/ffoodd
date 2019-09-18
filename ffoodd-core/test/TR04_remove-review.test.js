const client = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Remove a review', () => {
  it('should delete a review object', done => {
    client.start().then(({ reviewClient }) => {
      const requiredIdRequest = { _id: '5d2b6624b7f8ec773b3a95dc', meal_id: '5d2b6334406c706d1809d14e' };
      reviewClient.remove(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
