var express = require('express');
var router = express.Router();
const { createUser, userLogin } = require('../Controller/UserController');

router.post('/signup', createUser);
router.post('/login', userLogin);

module.exports = router;
