'use strict';

module.exports = ({ emailController: controller, createRoute }) => {
  const router = {};

  router.send = createRoute(controller.send);
  
  return router;
}
