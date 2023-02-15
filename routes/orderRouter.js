const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, orderController.create);
router.post('/:basketId', authMiddleware, orderController.getById);

// router.delete('/item/:basketId', authMiddleware, basketController.delete);
// router.get(
//     '/item/:basketId',
//     authMiddleware,
//     // userController.check,
//     basketController.getAll,
// );

module.exports = router;
