'use strict';

const express = require('express');
const router = express.Router();


module.exports = container => {
  const controller = require('../controllers/account.controller')(container);

  router.get('/', controller.getProfile);

  router.put('/', controller.putProfile);

  router.patch('/password', controller.patchPassword);

  router.patch('/email', controller.patchEmail);

  return router;
}
