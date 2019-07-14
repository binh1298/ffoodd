const mealRepository = require('./meal.repository');
const categoryRepository = require('./category.repository');
const reviewRepository = require('./review.repository');

module.exports = Object.create({
  gatherDependencies: async () => ({
    mealRepository,
    categoryRepository,
    reviewRepository
  })
});
