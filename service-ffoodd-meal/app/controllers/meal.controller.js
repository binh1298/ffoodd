'use strict';

const { to } = require('await-to-js');

const messages = {
  MEAL_CREATED: 'MEAL_CREATED',
  MEAL_FOUND: 'MEAL_FOUND',
  MEAL_DETELETED: 'MEAL_DELETED',
  MEAL_UPDATED: 'MEAL_UPDATED',
  MEAL_NOT_FOUND: 'MEAL_NOT_FOUND'
};

module.exports = ({ mealRepository: Meal }) => {
  const create = async (call, callback, next) => {
    const { meal } = call.request;
    const [err, newMeal] = await to(Meal.create(meal));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.MEAL_CREATED
    });
  };

  const findById = async (call, callback, next) => {
    const { _id } = call.request;
    const [err, meal] = await to(Meal.findById({ _id }));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.MEAL_FOUND,
      meal
    });
  };

  const remove = async (call, callback, next) => {
    const { _id } = call.request;
    const [err, result] = await to(Meal.remove({ _id }));
    if (err) return next(err);

    if (!result)
      return callback(null, {
        success: false,
        message: messages.MEAL_NOT_FOUND
      });

    callback(null, {
      success: true,
      message: messages.MEAL_DETELETED
    });
  };

  const update = async ({ request: meal }, callback, next) => {
    const [err, editedMeal] = await to(Meal.update(meal));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.MEAL_UPDATED,
      meal: editedMeal
    });
  };

  return {
    create,
    findById,
    remove,
    update
  };
};
