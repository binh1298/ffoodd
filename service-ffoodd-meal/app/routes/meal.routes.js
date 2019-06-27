const controller = require('../controllers/meal.controller');
const createRoute = require('../libs/create-route');

const router = {};

router.create = createRoute(controller.create);
router.read = createRoute(controller.read);
router.remove = createRoute(controller.remove);
router.update = createRoute(controller.update);
// router.searchMeal = controller.search;

module.exports = router;
