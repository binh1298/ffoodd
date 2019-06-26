'use strict';

const express = require('express');
const router = express.Router();


module.exports = container => {
  const controller = require('../controllers/account.controller')(container);

  router.get('/profile', controller.getProfile);

  router.put('/profile', controller.putProfile);

  router.patch('/password', controller.patchPassword);

  return router;
}
