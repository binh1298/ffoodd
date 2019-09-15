'use strict';

const status = require('http-status');
const { to } = require('await-to-js');

module.exports = ({ mealGRPCClientService, accountGRPCClientService }) => {
  const Meal = mealGRPCClientService.meal;
  const Account = accountGRPCClientService.account;

  const findOwnMeals = (req, res, next) => {
    const [ err, meals ] = Meal.findByAccountId({ account_id: req.user._id });
    if (err) return next(err);

    res.status(status.OK).render('meals/own-meal', { data: {
      success: true,
      message: 'Get own meals',
      meals
    }});
  }

  return {
    findOwnMeals
  }
}
