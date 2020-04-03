const express = require('express');
const {register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword} = require('../controller/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe)
router.put('/updatedetails', protect, updateDetails)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken', resetPassword)
router.put('/updatepassword', protect, updatePassword)

module.exports = router;