const mealGRPCRoute = require('./meal.grpc-route');
const categoryGRPCRoute = require('./category.grpc-route');
const reviewGRPCRoute = require('./review.grpc-route');

module.exports = {
  gatherDependencies: async () => ({
    mealGRPCRoute,
    categoryGRPCRoute,
    reviewGRPCRoute
  })
};
