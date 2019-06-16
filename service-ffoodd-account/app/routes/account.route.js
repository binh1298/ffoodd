const controller = require('../controllers/account.controller');
const createRoute = require('../libs/create-route');
const auth = require('../middlewares/auth.middleware');

const router = {};

router.create = createRoute(controller.create);

router.newEmailVerifyKey = createRoute(controller.newEmailVerifyKey);

router.verifyEmail = createRoute(controller.verifyEmail);

module.exports = router;
