'use strict';

const { to } = require('await-to-js');

const messages = {
  REVIEW_CREATED: 'REVIEW_CREATED',
  REVIEWS_FOUND: 'REVIEWS_FOUND',
  REVIEW_DETELETED: 'REVIEW_DETELETED',
  REVIEW_UPDATED: 'REVIEW_UPDATED',
  REVIEW_NOT_FOUND: 'REVIEW_NOT_FOUND'
};

module.exports = ({ reviewRepository: Review }) => {
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
    review
    // getReviewsById,
    // updateReview,
    // removeReview
  };
};
