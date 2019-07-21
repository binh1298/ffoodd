const authController = require('./auth.controller');
const accountController = require('./account.controller');
const mealController = require('./meal.controller');

module.exports = Object.create({
  initialize: async () => ({
    authController,
    accountController,
    mealController
  })
});
