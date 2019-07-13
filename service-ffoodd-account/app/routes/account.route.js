'use strict';

module.exports = ({ accountController: controller, createRoute }) => {
  const router = {};
  
  router.findById = createRoute(controller.findById);

  router.create = createRoute(controller.create);

  router.update = createRoute(controller.update);

  router.remove = createRoute(controller.remove);

  router.removeMany = createRoute(controller.removeMany);

  router.newEmailVerifyKey = createRoute(controller.newEmailVerifyKey);

  router.verifyEmail = createRoute(controller.verifyEmail);

  router.findByUsername = createRoute(controller.findByUsername);

  router.resetPassword = createRoute(controller.resetPassword);

  router.updatePasswordById = createRoute(controller.updatePasswordById);

  router.updateEmailById = createRoute(controller.updateEmailById);

  router.sendFriendRequest = createRoute(controller.sendFriendRequest);

  router.findFriendRequests = createRoute(controller.findFriendRequests);

  router.findSentFriendRequests = createRoute(controller.findSentFriendRequests);

  router.acceptFriendRequest = createRoute(controller.acceptFriendRequest);

  router.removeFriendRequest = createRoute(controller.removeFriendRequest);

  router.addOwnMeal = createRoute(controller.addOwnMeal);

  return router;
}
