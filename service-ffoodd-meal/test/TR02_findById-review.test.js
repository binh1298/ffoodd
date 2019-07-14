const client = require('../app/grpc-clients/meal.client');
const assert = require('assert');

require('should');

describe('Meal gRPC-client-Happy Case: Find a review by ID', () => {
  it('should receive a review object', done => {
    client.start().then(({ reviewClient }) => {
      const requiredIdRequest = { id: '5d2b3c31da74b1243ff8cb3f', meal_id: '5d2b3bf792c2ea23761d590e' };
      reviewClient.findById(requiredIdRequest, async (err, response) => {
        assert(response.success, true);
        assert(response.message, 'REVIEW FOUNDED');
        done();
      });
    });
  });
});
