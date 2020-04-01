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

    sendTokenResponse(user, 200, res);
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
    sendTokenResponse(user, 200, res);
})

// Get token from model, create cookie and send reponse
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly : true,
		secure: true
	}
	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}
    res
        .status(200)
        .cookie('token', token, options)
        .json({
            status: 'success',
            token
        })

}

// @desc Login user
// @route POST /api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async(req, res, next) => {
	const user = await User.findById(req.user.id);
	
	res.status(200).json({
		status: 'success',
		data: user
	})
})
