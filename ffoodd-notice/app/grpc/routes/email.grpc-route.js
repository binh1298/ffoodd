'use strict';

module.exports = ({ emailGRPCController: controller, createRoute }) => {
  const router = {};

  router.send = createRoute(controller.send);

  router.sendToOneUser = createRoute(controller.sendToOneUser);

  router.sendToManyUsers = createRoute(controller.sendToManyUsers);

  return router;
}
