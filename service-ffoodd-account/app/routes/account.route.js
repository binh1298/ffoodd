const controller = require('../controllers/account.controller');
const createRoute = require('../libs/create-route');
const auth = require('../middlewares/auth.middleware');

const router = {};

router.create = createRoute(auth.requireAuth, controller.create);

module.exports = router;
