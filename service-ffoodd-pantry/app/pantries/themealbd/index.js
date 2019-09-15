const findAllCategoriesFromThemealdb = require('./find-all-categories.themealdb.pantry');
const findMealsByCategoryFromThemealdb = require('./find-meals-by-category.themealdb.pantry');
const findMealByIdFromThemealdb = require('./find-meal-by-id.themealdb.pantry');

module.exports = {
  findAllCategoriesFromThemealdb,
  findMealsByCategoryFromThemealdb,
  findMealByIdFromThemealdb
}
