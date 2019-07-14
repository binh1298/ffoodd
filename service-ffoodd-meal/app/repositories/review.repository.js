'use strict';

module.exports = () => {
  const create = async (meal, review) => {
    meal.reviews.push(review);
    return meal.save();
  };
  const findById = async (meal, id) => {
    return await meal.reviews.id(id);
  };

  const remove = async (meal, id) => {
    await meal.reviews.id(id).remove();
    return await meal.save();
  };

  const update = async (meal, review) => {
    const oldReview = await findById(meal, review.id);
    oldReview.rating = review.rating;
    oldReview.content = review.content;
    await meal.save();
    return meal;
  };
  return {
    create,
    findById,
    remove,
    update
  };
};
