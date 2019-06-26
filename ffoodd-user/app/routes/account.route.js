'use strict';

const express = require('express');

module.exports = ({ accountController: controller }) => {
  const router = express.Router();

  router.get('/', controller.getProfile);

  router.put('/', controller.putProfile);

  router.patch('/password', controller.patchPassword);

  router.patch('/email', controller.patchEmail);

  return router;
}
