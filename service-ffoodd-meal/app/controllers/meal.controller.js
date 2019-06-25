'use strict';

const { to } = require('await-to-js');
const Meal = require('../repositories/meal.repository');

const messages = {
  CREATED_MEAL: 'MEAL CREATED!',
  DELETED_MEAL: 'MEAL DELETED!',
  UPDATED_MEAL: 'MEAL UPDATED!',
  NOT_FOUND: 'MEAL NOT FOUND!',
  INVALID_FIELD: 'This field can not be updated!',
  MISSING_ID: 'Please provide meal ID'
};
// TODO Validate

const create = async ({ request }, callback, next) => {
  const [err, account] = await to(Meal.create(request));

  if (err) return next(err);
  callback(null, {
    success: true,
    message: messages.CREATED_MEAL
  });
};
const read = async ({ request }, callback, next) => {
  const [err, meal] = await to(Meal.findById(request.id));
  if (err) return next(err);
  callback(null, meal);
};
const deleteMeal = async ({ request }, callback, next) => {
  const [err, meal] = await to(Meal.findByIdAndDelete(request.id));
  if (err) return next(err);
  if (meal)
    callback(null, {
      success: true,
      message: messages.DELETED_MEAL
    });
  else {
    callback(null, {
      success: true,
      message: messages.NOT_FOUND
    });
  }
};
const updateMeal = async ({ request }, callback, next) => {
  const id = request.id;
  const [err, editedMeal] = await to(Meal.update(id, request));
  if (err) return next(err);
  callback(null, editedMeal);
};
const search = async ({ request }, callback, next) => {
  const [err, meals] = await to(Meal.search(request));
  console.log(err, meals);
  if (err) return next(err);
  callback(null, {
    success: true,
    meals
  });
};

module.exports = {
  create,
  read,
  deleteMeal,
  updateMeal,
  search
};
