'use strict';

const express = require('express');
const router = express.Router();

module.exports = ({ authMiddleware: auth, accountRoute, authRoute }) => {
  router.get('/', (req, res) => res.send('<h1>USER</h1>'));

  router.use('/accounts',
    auth.requireAuth,
    accountRoute
  );

  router.use('/auth', authRoute);

  return router;
}
