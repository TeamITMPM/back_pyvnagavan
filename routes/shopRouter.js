const Router = require('express');
const router = new Router();
const shopController = require('../controllers/shopController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), shopController.createShop);
router.get('/', shopController.getAllShop);
router.post('/bind', checkRole('ADMIN'), shopController.bindItemToShop);
router.get('/binded', shopController.getAllItems);
router.get('/binded/:shopId', shopController.filterItemsByShop);

module.exports = router;
