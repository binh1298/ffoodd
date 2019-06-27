const controller = require('../controllers/meal.controller');
// const createRoute = require('..libs/create-route');

const router = {};

router.create = controller.create;
router.read = controller.read;
router.remove = controller.remove;
router.update = controller.update;
// router.searchMeal = controller.search;

module.exports = router;
