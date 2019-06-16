const controller = require('../controllers/account.controller');
const createRoute = require('../libs/create-route');

const router = {};

router.create = createRoute(controller.create);

module.exports = router;
