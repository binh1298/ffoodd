const controller = require('../controllers/meal.controller');
const createRoute = require('../libs/create-route');

const router = {};

router.create = createRoute(controller.create);
router.findById = createRoute(controller.findById);
router.remove = createRoute(controller.remove);
router.update = createRoute(controller.update);

module.exports = router;
