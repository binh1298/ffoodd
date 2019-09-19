'use strict';

const express = require('express');
const router = express.Router();


module.exports = ({ authMiddleware: auth, accountRoute, authController: controller }) => {
  router.get('/', (req, res) => res.send('<h1>AUTH</h1>'));

  router.use('/accounts',
    auth.requireAuth,
    accountRoute
  );

	router.post('/signin', controller.postSignIn);

  router.post('/signup', controller.postSignUp);

  router.get('/verify/email',
    auth.requireAuth,
    controller.getVerifyEmail
  );

  router.patch('/verify/email',
    auth.requireAuth,
    controller.patchVerifyEmail
  );

  router.get('/resetpwd/:username', controller.getResetPassword);

  router.patch('/resetpwd/:username', controller.patchResetPassword);

  return router;
}
