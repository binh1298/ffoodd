const mealRepository = require('./meal.repository');
const categoryRepository = require('./category.repository');
module.exports = Object.create({
  gatherDependencies: async () => ({
    mealRepository,
    categoryRepository
  })
});
