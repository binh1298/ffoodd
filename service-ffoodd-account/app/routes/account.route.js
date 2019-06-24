const controller = require('../controllers/account.controller');
const createRoute = require('../libs/create-route');
const auth = require('../middlewares/auth.middleware');

const router = {};

module.exports = ({ accountController: controller }) => {
  router.create = createRoute(controller.create);

  router.newEmailVerifyKey = createRoute(controller.newEmailVerifyKey);

  router.verifyEmail = createRoute(controller.verifyEmail);

  router.findByUsername = createRoute(controller.findByUsername);

  router.resetPassword = createRoute(controller.resetPassword);

  router.updatePassword = createRoute(controller.updatePassword);

  return router;
}
