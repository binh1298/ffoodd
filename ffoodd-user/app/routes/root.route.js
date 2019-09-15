'use strict';

const express = require('express');
const router = express.Router();

module.exports = ({ authMiddleware: auth, accountRoute, authRoute, mealRoute }) => {
  router.get('/', (req, res) => res.send('<h1>USER</h1>'));

  router.use('/profile',
    auth.requireAuth,
    accountRoute
  );

  router.use('/auth', authRoute);

  router.use('/meals', auth.requireAuth, mealRoute);

  return router;
}
