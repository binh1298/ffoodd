const mealRepository = require('./meal.repository');

module.exports = Object.create({
  gatherDependencies: async () => ({
    mealRepository
  })
});
