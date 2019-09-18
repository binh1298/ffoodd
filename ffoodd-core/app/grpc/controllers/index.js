const mealGRPCController = require('./meal.grpc-controller');
const categoryGRPCController = require('./category.grpc-controller');
const reviewGRPCController = require('./review.grpc-controller');

module.exports = Object.create({
  gatherDependencies: async () => ({
    mealGRPCController,
    categoryGRPCController,
    reviewGRPCController
  })
});
