const client = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Remove a review', () => {
  it('should delete a review object', done => {
    client.start().then(({ reviewClient }) => {
      const requiredIdRequest = { id: '5d2b47284f5f75357731b0d3', meal_id: '5d2b3bf792c2ea23761d590e' };
      reviewClient.remove(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        done();
      });
    });
  });
});
