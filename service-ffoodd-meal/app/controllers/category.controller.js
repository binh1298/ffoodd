'use strict';

const { to } = require('await-to-js');

const messages = {
  CATEGORY_CREATED: 'CATEGORY_CREATED',
  CATEGORY_FOUND: 'CATEGORY_FOUND',
  CATEGORY_DELETED: 'CATEGORY_DELETED',
  CATEGORY_UPDATED: 'CATEGORY_UPDATED',
  CATEGORY_NOT_FOUND: 'CATEGORY_NOT_FOUND'
};

module.exports = ({ categoryRepository: Category }) => {
  const create = async (call, callback, next) => {
    const { category } = call.request;
    const [err, newCategory] = await to(Category.create(category));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.CATEGORY_CREATED
    });
  };

  const findById = async (call, callback, next) => {
    const { id } = call.request;
    const [err, category] = await to(Category.findById({ id }));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.CATEGORY_FOUND,
      category
    });
  };

  const remove = async (call, callback, next) => {
    const { id } = call.request;
    const [err, result] = await to(Category.remove({ id }));
    if (err) return next(err);

    if (result)
      return callback(null, {
        success: false,
        message: messages.CATEGORY_NOT_FOUND
      });

    callback(null, {
      success: true,
      message: messages.CATEGORY_DELETED
    });
  };

  const update = async (call, callback, next) => {
    const { category } = call.request;
    const [err, editedCategory] = await to(Category.update(category));
    if (err) return next(err);

    callback(null, {
      success: true,
      message: messages.CATEGORY_UPDATED,
      category: editedCategory
    });
  };

  return {
    create,
    findById,
    remove,
    update
  };
};
