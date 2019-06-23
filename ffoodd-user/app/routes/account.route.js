'use strict';

const express = require('express');
const router = express.Router();


module.exports = ({ accountController: controller }) => {
  router.get('/profile', controller.showProfile);

  return router;
}
