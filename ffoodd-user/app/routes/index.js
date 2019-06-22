'use strict';

const express = require('express');
const router = express.Router();

const accountRoute = require('./account.route');
const authRoute = require('./auth.route');

module.exports = container => {
    const { authMiddleware: auth } = container.resolve('middlewares');

    router.get('/', (req, res) => {
      res.send('<h1>USER</h1>');
    });

    router.use('/accounts',
      auth.requireAuth,
      auth.requireRole([ 'admin' ]),
      accountRoute(container)
    );

    // router.use('/auth', authRoute(container));

    return router;
}
