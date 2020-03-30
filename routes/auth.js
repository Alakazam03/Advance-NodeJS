const express = require('express');
const {register} = require('../controller/auth');
const router = express.Router();

router.post('/register', register);

module.exports = router;