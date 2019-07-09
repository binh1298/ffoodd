const mealRepository = require('./meal.repository');
const categoryRepository = require('./cateogory.repository');
module.exports = Object.create({
  gatherDependencies: async () => ({
    mealRepository,
    categoryRepository
  })
});
