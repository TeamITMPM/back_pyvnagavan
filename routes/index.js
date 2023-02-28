const Router = require('express');
const router = new Router();

const itemRouter = require('./itemRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const basketRouter = require('./basketRouter');
const orderRouter = require('./orderRouter');
const shopRouter = require('./shopRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/item', itemRouter);
router.use('/basket', basketRouter);
router.use('/order', orderRouter);
router.use('/shop', shopRouter);

module.exports = router;
