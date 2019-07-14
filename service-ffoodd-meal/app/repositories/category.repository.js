'use strict';

const CategoryModel = require('../models/category.model');

module.exports = () => {
  const create = async ({ name, description, imageUrl }) => {
    const newCategory = new CategoryModel({ name, description, imageUrl });
    newCategory.save();
  };

  const findById = async ({ _id }) => {
    return CategoryModel.findById(_id);
  };
  const remove = async ({ _id }) => {
    return CategoryModel.findByIdAndRemove(_id);
  };

  const update = async ({ _id, name, description, imageUrl }) => {
    let editedCategory = await CategoryModel.findById(_id);
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
