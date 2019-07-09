const mealRoute = require('./meal.route');
const categoryRoute = require('./category.route');
module.exports = {
  gatherDependencies: async () => ({
    mealRoute,
    categoryRoute
  })
};
