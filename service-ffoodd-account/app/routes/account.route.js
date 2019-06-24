'use strict';

const router = {};

module.exports = ({ accountController: controller, createRoute }) => {
  router.create = createRoute(controller.create);

  router.newEmailVerifyKey = createRoute(controller.newEmailVerifyKey);

  router.verifyEmail = createRoute(controller.verifyEmail);

  router.findByUsername = createRoute(controller.findByUsername);

  router.resetPassword = createRoute(controller.resetPassword);

  router.updatePassword = createRoute(controller.updatePassword);

  return router;
}
