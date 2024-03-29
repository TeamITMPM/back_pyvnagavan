const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create/:basketId', authMiddleware, orderController.create);
router.get('/:basketId', authMiddleware, orderController.getById);

module.exports = router;
