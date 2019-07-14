const mealController = require('./meal.controller');
const categoryController = require('./category.controller');
const reviewController = require('./review.controller');

module.exports = Object.create({
  gatherDependencies: async () => ({
    mealController,
    categoryController,
    reviewController
  })
});
