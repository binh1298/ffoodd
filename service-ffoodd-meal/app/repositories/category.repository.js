'use strict';

const CategoryModel = require('../models/category.model');

module.exports = () => {
  const create = async category => {
    const newCategory = new CategoryModel(category);
    newCategory.save();
  };

  const findById = async ({ id }) => {
    return CategoryModel.findById(id);
  };
  const remove = async ({ id }) => {
    return CategoryModel.findByIdAndRemove(id);
  };

  const update = async ({ id, name, description, imageUrl }) => {
    let editedCategory = await CategoryModel.findById(id);
    if (!editedCategory) return;
    editedCategory.name = name;
    editedCategory.description = description;
    editedCategory.imageUrl = imageUrl;
    editedCategory.save();
    return editedCategory;
  };
  return {
    create,
    findById,
    remove,
    update
  };
};