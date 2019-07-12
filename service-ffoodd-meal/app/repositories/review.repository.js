'use strict';

const ReviewModel = require('../models/review.model');

module.exports = () => {
  const create = async review => {
    const newReview = new ReviewModel(review);
    return await newReview.save();
  };

  return {
    create
  };
};
