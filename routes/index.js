const Router = require('express');
const router = new Router();

const itemRouter = require('./itemRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/item', itemRouter);

module.exports = router;

// const Router = require('express');
// const router = new Router();
// const itemRouter = require('./itemRouter');
// const userRouter = require('./userRouter');
// const brandRouter = require('./brandRouter');
// const typeRouter = require('./typeRouter');

// router.use('/user', userRouter);
// router.use('/type', typeRouter);
// router.use('/brand', brandRouter);
// router.use('/item', itemRouter);

// module.exports = router;
