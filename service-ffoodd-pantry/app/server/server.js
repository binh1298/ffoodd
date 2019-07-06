'use strict';

const { to } = require('await-to-js');

const start = ({
  logger,
  findAllCategoriesFromThemealdb,
  findMealsByCategoryFromThemealdb,
  findMealByIdFromThemealdb
}) => async () => {
  process.on('uncaughtException', err => {  
    logger.error('Unhandled Exception', err);
  });

  process.on('uncaughtRejection', (err, promise) => {
    logger.error('Unhandled Rejection', err);
  });
  
  const [ err0, categories ] = await to(findAllCategoriesFromThemealdb());
  if (err0) throw err0;
  
  for (let c of categories) {
    const [ err1, meals ] = await to(findMealsByCategoryFromThemealdb({ categoryName: c.strCategory}));
    if (err1) throw err1;

    for (let m of meals) {
       const [ err2, meal ] = await to(findMealByIdFromThemealdb({ id: m.idMeal}));
    }
  }
};

module.exports = Object.create({ start });
