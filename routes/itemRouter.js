const Router = require('express');
const router = new Router();
const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), itemController.create);
router.get('/', itemController.getAll, userController.createTempBasket);
router.get('/:id', itemController.getOne);

module.exports = router;
