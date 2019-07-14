'use strict';

const MealModel = require('../models/meal.model');

module.exports = () => {
  const create = async ({ name, description, origin, image, themealdb_id, recipe }) => {
    const newMeal = new MealModel({ name, description, origin, image, themealdb_id, recipe });
    newMeal.save();
  };

  const findById = async ({ _id }) => {
    return await MealModel.findById(_id);
  };

  const remove = async ({ _id }) => {
    return MealModel.findByIdAndRemove(_id);
  };

  const update = async ({ _id, name, description, origin, category_id, image, recipe }) => {
    let editedMeal = await MealModel.findById(_id);
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
