'use strict';

const express = require('express');
const router = express.Router();


module.exports = ({ authMiddleware: auth }) => {
  router.get('/', (req, res) => res.send('<h1>CORE</h1>'));

  return router;
}
