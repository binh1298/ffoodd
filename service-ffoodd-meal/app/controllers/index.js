const mealController = require('./meal.controller');

module.exports = Object.create({
  gatherDependencies: async () => ({
    mealController
  })
});