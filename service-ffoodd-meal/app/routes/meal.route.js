module.exports = ({ mealController: controller, createRoute }) => {
  const router = {};

  router.create = createRoute(controller.create);
  router.findById = createRoute(controller.findById);
  router.remove = createRoute(controller.remove);
  router.update = createRoute(controller.update);
  router.review = createRoute(controller.review);

  return router;
};
