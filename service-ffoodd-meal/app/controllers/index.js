const mealController = require('./meal.controller');
const categoryController = require('./category.controller');

module.exports = Object.create({
  gatherDependencies: async () => ({
    mealController,
    categoryController
  })
});
