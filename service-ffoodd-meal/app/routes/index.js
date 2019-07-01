const mealRoute = require('./meal.route');
const serviceRoute = require('./service.route');
module.exports = {
  gatherDependencies: () => ({
    mealRoute,
    serviceRoute
  })
};
