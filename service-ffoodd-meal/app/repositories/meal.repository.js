'use strict';

const MealModel = require('../models/meal.model');

const create = async meal => {
  const newMeal = new MealModel(meal);
  await newMeal.save();
};
const findById = async id => {
  return await MealModel.findById(id);
};
const findByIdAndDelete = async id => {
  return await MealModel.findByIdAndDelete(id);
};
const update = async (id, request) => {
  delete request.id;
  const updatingFields = Object.keys(request);
  const allowedUpdates = [
    'name',
    'description',
    'origin',
    'category_id',
    'image',
    'reviews',
    'recipe'
  ];
  const isValidOperation = updatingFields.every(field =>
    allowedUpdates.includes(field)
  );
  if (!isValidOperation) throw new Error('This field can not be updated!');
  if (!id) throw new Error('Please provide meal ID');
  let editedMeal = await MealModel.findById(id);
  updatingFields.forEach(field => {
    editedMeal[field] = request[field];
  });
  await editedMeal.save();
  return editedMeal;
};
const search = async request => {
  return await MealModel.find(request);
};

module.exports = {
  create,
  findById,
  findByIdAndDelete,
  update,
  search
};
