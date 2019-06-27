'use strict';

const MealModel = require('../models/meal.model');

const create = async meal => {
  const newMeal = new MealModel(meal);
  await newMeal.save();
};
const findById = async ({ id }) => {
  return await MealModel.findById(id);
};
const remove = async ({ id }) => {
  return await MealModel.findByIdAndDelete(id);
};
// Use Destructuring
const update = async ({
  id,
  name,
  description,
  origin,
  category_id,
  image,
  recipes
}) => {
  let editedMeal = await MealModel.findById(id);
  editedMeal.name = name;
  editedMeal.description = description;
  editedMeal.origin = origin;
  editedMeal.category_id = category_id;
  editedMeal.image = image;
  editedMeal.recipes = recipes;
  editedMeal.save();
  return editedMeal;
};

const search = async request => {
  return await MealModel.find(request);
};

module.exports = {
  create,
  findById,
  remove,
  update
};
