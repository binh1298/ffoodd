'use strict';

const express = require('express');
const router = express.Router();


module.exports = container => {
  const controller = require('../controllers/account.controller')(container);

  router.get('/profile', controller.getProfile);

  return router;
}
