'use strict';

const MealModel = require('../models/meal.model');

module.exports = () => {
  const create = async (meal, review) => {
    meal.reviews.push(review);
    await meal.save();
    return meal;
  };
  const findById = async (meal, id) => {
    return await meal.reviews.id(id);
  };

  const remove = async ({ id }) => {};

  const update = async () => {};
  return {
    create,
    findById,
    remove,
    update
  };
};
