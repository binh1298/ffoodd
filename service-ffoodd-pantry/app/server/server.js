'use strict';

const start = ({
  logger,
  findAllCategoriesFromThemealdb,
  findMealsByCAtegoryFromThemealdb,
  findMealByIdFromThemealdb
}) => async () => {
  process.on('uncaughtException', err => {  
    logger.error('Unhandled Exception', err);
  });

  process.on('uncaughtRejection', (err, promise) => {
    logger.error('Unhandled Rejection', err);
  });
  
  findAllCategoriesFromThemealdb();
  findMealsByCAtegoryFromThemealdb();
  findMealByIdFromThemealdb();
};

module.exports = Object.create({ start });
