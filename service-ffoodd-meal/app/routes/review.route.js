module.exports = ({ reviewController: controller, createRoute }) => {
  const router = {};

  router.review = createRoute(controller.review);

  return router;
};
