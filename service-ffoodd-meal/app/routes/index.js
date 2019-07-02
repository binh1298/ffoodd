const mealRoute = require('./meal.route');
module.exports = {
  gatherDependencies: async () => ({
    mealRoute
  })
};
