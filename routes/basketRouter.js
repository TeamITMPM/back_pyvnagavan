const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/item/:basketId', authMiddleware, basketController.create);
router.put('/item/:basketId', authMiddleware);
router.get(
    '/item/:basketId',
    authMiddleware,
    // userController.check,
    basketController.getOne,
);

module.exports = router;
