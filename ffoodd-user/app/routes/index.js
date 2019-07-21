const rootRoute = require('./root.route');
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');
const mealRoute = require('./meal.route');

module.exports = Object.create({
  initialize: async () => ({
    rootRoute,
    accountRoute,
    authRoute,
    mealRoute
  })
});
