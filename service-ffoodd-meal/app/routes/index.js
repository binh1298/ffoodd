const mealRoute = require('./meal.route');
const categoryRoute = require('./category.route');
const reviewRoute = require('./review.route');

module.exports = {
  gatherDependencies: async () => ({
    mealRoute,
    categoryRoute,
    reviewRoute
  })
};
