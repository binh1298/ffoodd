const controller = require('../controllers/meal.controller');
// const createRoute = require('..libs/create-route');

const router = {};

router.create = controller.create;
router.read = controller.read;
router.deleteMeal = controller.deleteMeal;
router.updateMeal = controller.updateMeal;
router.searchMeal = controller.search;

module.exports = router;
