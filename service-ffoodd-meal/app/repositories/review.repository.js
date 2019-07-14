'use strict';

const mongoose = require('mongoose');

module.exports = () => {
  const addReview = async (meal, review) => {
    review._id = mongoose.Types.ObjectId();
    meal.reviews.push(review);
    await meal.save();
    return meal;
  };
  return {
    addReview
  };
};
