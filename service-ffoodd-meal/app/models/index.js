const MealModel = require('./meal.model');

module.exports = Object.create({
  gatherDependencies: () => ({
    MealModel
  })
});