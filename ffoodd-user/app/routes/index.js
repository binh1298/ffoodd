'use strict';

const express = require('express');
const router = express.Router();

const accountRoute = require('./account.route');

module.exports = container => {
    const { authMiddleware: auth } = container.resolve('middlewares');

    router.get('/', (req, res) => {
      res.send('<h1>USER</h1>');
    });

    router.use('/profile',
      auth.requireAuth,
      auth.requireRole([ 'user' ]),
      accountRoute(container)
    );

    return router;
}
