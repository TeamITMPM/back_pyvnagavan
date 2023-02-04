const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/item/:basketId', authMiddleware, basketController.create);
router.delete('/item/:basketId', authMiddleware, basketController.delete);
router.get(
    '/item/:basketId',
    authMiddleware,
    // userController.check,
    basketController.getAll,
);

module.exports = router;
