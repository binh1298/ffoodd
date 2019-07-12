'use strict';

const { to } = require('await-to-js');

const messages = {
  MEAL_CREATED: 'MEAL_CREATED',
  MEAL_FOUND: 'MEAL_FOUND',
  MEAL_DETELETED: 'MEAL_DELETED',
  MEAL_UPDATED: 'MEAL_UPDATED',
  MEAL_NOT_FOUND: 'MEAL_NOT_FOUND',
  REVIEW_CREATED: 'REVIEW_CREATED',
  REVIEWS_FOUND: 'REVIEWS_FOUND',
  REVIEW_DETELETED: 'REVIEW_DETELETED',
  REVIEW_UPDATED: 'REVIEW_UPDATED',
  REVIEW_NOT_FOUND: 'REVIEW_NOT_FOUND'
};

module.exports = ({ mealRepository: Meal, reviewRepository: Review }) => {
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
    const { id } = call.request;
    const [err, meal] = await to(Meal.findById({ id }));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.MEAL_FOUND,
      meal
    });
  };

  const remove = async (call, callback, next) => {
    const { id } = call.request;
    const [err, result] = await to(Meal.remove({ id }));
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

  const review = async (call, callback, next) => {
    const { meal_id, review } = call.request;
    // Checking if the meal exists in the database
    const [errMeal, meal] = await to(Meal.findById({ id: meal_id }));
    if (errMeal) return next(errMeal);
    if (!meal) {
      return callback(null, {
        success: false,
        message: messages.MEAL_NOT_FOUND
      });
    }

    // Create new review document
    const [errReview, newReview] = await to(Review.create(review));
    if (errReview) return next(errReview);

    // Add review_id to meal
    const [err, reviewedMeal] = await to(Meal.addReview(meal, newReview));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.REVIEW_CREATED
    });
  };
  return {
    create,
    findById,
    remove,
    update,
    review
    // getReviewsById,
    // updateReview,
    // removeReview
  };
};
