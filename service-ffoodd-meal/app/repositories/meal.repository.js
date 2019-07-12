'use strict';

const MealModel = require('../models/meal.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = () => {
  const create = async meal => {
    const newMeal = new MealModel(meal);
    newMeal.save();
  };

  const findById = async ({ id }) => {
    return MealModel.findById(id);
  };

  const remove = async ({ id }) => {
    return MealModel.findByIdAndRemove(id);
  };

  const update = async ({ id, name, description, origin, category_id, image, recipe }) => {
    let editedMeal = await MealModel.findById(id);
    if (!editedMeal) return;
    editedMeal.name = name;
    editedMeal.description = description;
    editedMeal.origin = origin;
    editedMeal.category_id = category_id;
    editedMeal.image = image;
    editedMeal.recipe = recipe;

    editedMeal.save();
    return editedMeal;
  };
  return {
    create,
    findById,
    remove,
    update
  };
};
