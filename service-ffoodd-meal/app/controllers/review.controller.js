'use strict';

const { to } = require('await-to-js');

const messages = {
  MEAL_NOT_FOUND: 'MEAL_NOT_FOUND',
  REVIEW_CREATED: 'REVIEW_CREATED',
  REVIEWS_FOUND: 'REVIEWS_FOUND',
  REVIEW_REMOVED: 'REVIEW_REMOVED',
  REVIEW_UPDATED: 'REVIEW_UPDATED',
  REVIEW_NOT_FOUND: 'REVIEW_NOT_FOUND'
};

module.exports = ({ mealRepository: Meal, reviewRepository: Review }) => {
  const create = async (call, callback, next) => {
    const { meal_id, review } = call.request;
    // Checking if the meal exists in the database
    const [errMeal, meal] = await to(Meal.findById({ _id: meal_id }));
    if (errMeal) return next(errMeal);
    if (!meal) {
      return callback(null, {
        success: false,
        message: messages.MEAL_NOT_FOUND
      });
    }

    // Add review_id to meal
    const [err, reviewedMeal] = await to(Review.create(meal, review));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.REVIEW_CREATED
    });
  };

  const findById = async (call, callback, next) => {
    const { _id, meal_id } = call.request;
    const [errMeal, meal] = await to(Meal.findById({ _id: meal_id }));
    if (errMeal) return next(errMeal);
    if (!meal)
      return callback(null, {
        success: false,
        message: messages.MEAL_NOT_FOUND
      });

    const [err, review] = await to(Review.findById(meal, _id));
    if (err) return next(err);
    if (!review)
      return callback(null, {
        success: false,
        message: messages.REVIEW_NOT_FOUND
      });
    callback(null, {
      success: true,
      message: messages.REVIEWS_FOUND,
      review
    });
  };
  const remove = async (call, callback, next) => {
    const { _id, meal_id } = call.request;
    const [errMeal, meal] = await to(Meal.findById({ _id: meal_id }));
    if (errMeal) return next(errMeal);
    if (!meal)
      return callback(null, {
        success: false,
        message: messages.MEAL_NOT_FOUND
      });
    const [err, review] = await to(Review.remove(meal, _id));
    if (err) return next(err);
    if (!review)
      return callback(null, {
        success: false,
        message: messages.REVIEW_NOT_FOUND
      });
    callback(null, {
      success: true,
      message: messages.REVIEW_REMOVED
    });
  };

  const update = async (call, callback, next) => {
    const { meal_id, review } = call.request;
    // Checking if the meal exists in the database
    const [errMeal, meal] = await to(Meal.findById({ _id: meal_id }));
    if (errMeal) return next(errMeal);
    if (!meal) {
      return callback(null, {
        success: false,
        message: messages.MEAL_NOT_FOUND
      });
    }

    // Update review_id to meal
    const [err, reviewedMeal] = await to(Review.update(meal, review));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.REVIEW_UPDATED
    });
  };
  return {
    create,
    findById,
    remove,
    update
  };
};
