'use strict';

const MealModel = require('../models/meal.model');
const ObjectId = require('mongoose').Schema.ObjectId;

module.exports = () => {
  const create = async meal => {
    const newMeal = new MealModel(meal);
    newMeal.save();
  };

  const findById = async ({ id }) => {
    return MealModel.findById(id);
  };

  const remove = async ({ id }) => {
    return MealModel.deleteOne({ _id: ObjectId(id) });
  };

  const update = async meal => {
    const { id, name, description, origin, category_id, image, recipes } = meal;

    let editedMeal = await MealModel.findById(id);

    editedMeal.name = name;
    editedMeal.description = description;
    editedMeal.origin = origin;
    editedMeal.category_id = category_id;
    editedMeal.image = image;
    editedMeal.recipe = recipe;
    editedMeal.reviews = reviews;

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
