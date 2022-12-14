const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/item', authMiddleware, userController.check);
router.put('/item', authMiddleware, userController.check);
router.get(
    '/item',
    // authMiddleware,
    // userController.check,
    basketController.get,
);

module.exports = router;
