const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aysnc');
const User = require('../models/User');


// @desc Register user
// @route POST /api/v1/auth/register
exports.register = asyncHandler(async(req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email, 
        password,
        role
    })

    const token = user.getSignedJwtToken();
    res.status(200).json({
        'success': true,
        message: 'user added.',
        token,
        data: user
    })
})


// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async(req, res, next) => {
    const { email, password} = req.body;

    // Validate email and password 
    // create info gets checked by model
    if (!email || !password) {
        return next(
            new ErrorResponse('Please eneter email and password', 404)
        ) 
    }

    const user = await User.findOne({ email: email}).select('+password');

    if (!user) {
        return next(
            new ErrorResponse('Invalid credentials', 401)
        ) 
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(
            new ErrorResponse('Invalid credentials', 401)
        ) 
    }

    const token = user.getSignedJwtToken();
    res.status(200).json({
        'success': true,
        token: token
    })
})