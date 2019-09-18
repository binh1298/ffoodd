const client = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Find a review by ID', () => {
  it('should receive a review object', done => {
    client.start().then(({ reviewClient }) => {
      const requiredIdRequest = { _id: '5d2b636607fb1a6d9303039a', meal_id: '5d2b6334406c706d1809d14e' };
      reviewClient.findById(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'REVIEW FOUNDED');
        done();
      });
    });
  });
});
