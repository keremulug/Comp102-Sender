const router = require('express').Router();

const { signup, getMail } = require('../controller/appController');




router.post('/user/signup', signup);
router.post('/product/getMail',getMail);

module.exports = router;    