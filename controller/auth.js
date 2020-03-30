const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aysnc');
const User = require('../models/User');


// @desc Register user
// @route /api/v1/auth/register
exports.register = asyncHandler(async(req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email, 
        password,
        role
    })

    res.status(200).json({
        'success': true,
        message: 'user added.',
        data: user
    })
})