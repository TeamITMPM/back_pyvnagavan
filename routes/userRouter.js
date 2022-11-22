const Router = require('express');
const router = new Router();

router.post(' registration');
router.post('login');
router.get('/auth', (req, res) => {
    res.status(200).json({ message: 'Воно ' });
});

module.exports = router;
