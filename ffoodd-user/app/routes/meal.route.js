'use strict';

const express = require('express');

module.exports = ({ mealController: controller }) => {
  const router = express.Router();

  router.get('/', controller.findOwnMeals);

  return router;
}
