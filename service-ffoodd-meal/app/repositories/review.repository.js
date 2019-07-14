'use strict';

module.exports = () => {
  const create = async (meal, { rating, content }) => {
    meal.reviews.push({ rating, content });
    return await meal.save();
  };
  const findById = async (meal, _id) => {
    return await meal.reviews.id(_id);
  };

  const remove = async (meal, _id) => {
    await meal.reviews.id(_id).remove();
    return await meal.save();
  };

  const update = async (meal, review) => {
    const oldReview = await findById(meal, review._id);
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
