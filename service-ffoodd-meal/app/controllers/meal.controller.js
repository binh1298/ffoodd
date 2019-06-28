'use strict';

const { to } = require('await-to-js');
const Meal = require('../repositories/meal.repository');

const messages = {
  CREATED_MEAL: 'MEAL CREATED!',
  FOUNDED_MEAL: 'MEAL FOUNDED!',
  DELETED_MEAL: 'MEAL DELETED!',
  UPDATED_MEAL: 'MEAL UPDATED!',
  NOT_FOUND: 'MEAL NOT FOUND!',
  INVALID_FIELD: 'This field can not be updated!',
  MISSING_ID: 'Please provide meal ID'
};

const create = async ({ request: { meal } }, callback, next) => {
  const [err, newMeal] = await to(Meal.create(meal));
  if (err) return next(err);

  callback(null, {
    success: true,
    message: messages.CREATED_MEAL
  });
};

const findById = async ({ request: meal }, callback, next) => {
  const [err, foundMeal] = await to(Meal.findById(meal));
  if (err) return next(err);

  callback(null, {
    success: true,
    message: messages.FOUNDED_MEAL,
    meal: foundMeal
  });
};

const remove = async ({ request: meal }, callback, next) => {
  const [err, removedMeal] = await to(Meal.remove(meal));
  if (err) return next(err);

  if (removedMeal)
    return callback(null, {
      success: true,
      message: messages.DELETED_MEAL
    });

  callback(null, {
    success: true,
    message: messages.NOT_FOUND
  });
};

const update = async ({ request: meal }, callback, next) => {
  const [err, editedMeal] = await to(Meal.update(meal));
  if (err) return next(err);

  callback(null, {
    success: true,
    message: messages.FOUNDED_MEAL,
    meal: editedMeal
  });
};

module.exports = {
  create,
  findById,
  remove,
  update
};
