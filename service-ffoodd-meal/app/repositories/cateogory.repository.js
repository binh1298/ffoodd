'use strict';

const CategoryModel = require('../models/category.model');

module.exports = () => {
  const create = async meal => {
    const newCategory = new MealModel(meal);
    newCategory.save();
  };

  const findById = async ({ id }) => {
    return CategoryModel.findById(id);
  };
  const remove = async ({ id }) => {
    return CategoryModel.findByIdAndRemove(id);
  };

  const update = async category => {
    if (!(await CategoryModel.findById(category.id))) return;
    category.save();
    return category;
  };
  return {
    create,
    findById,
    remove,
    update
  };
};
