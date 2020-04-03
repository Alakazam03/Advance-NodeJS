const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aysnc');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');


// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
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

// @desc Login user
// @route POST /api/v1/auth/me
// @access Private
exports.forgotPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
        return next (
            new ErrorResponse(`There is no user with this email: ${req.body.email}`, 404)
        )
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave : false})
    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;
    const message = `Receive mail and put token and reset password. \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message: message
        })
        res.status(200).json({
            status: 'success',
            message: 'Email sent'
        })
    } catch (error) {
        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;        
        await user.save({ validateBeforeSave : false });

        return next(
            new ErrorResponse('Passowrd can not be reset', 401)
        )
    }
})

// @desc Reset password 
// @route PUT /api/v1/auth/resetpassword/:resetToken
// @access Public
exports.resetPassword = asyncHandler( async(req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

	const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()}
    });
	if (!user) {
        return next(
            new ErrorResponse(`Invalid Token`, 401)
        )
    }


    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

	sendTokenResponse(user, 200, res);
})

// @desc Update user details
// @route PUT /api/v1/auth/updatedetails
// @access Private
exports.updateDetails = asyncHandler(async(req, res, next) => {
    const fieldToUpdate = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, fieldToUpdate, {
        new: true,
        runValidators: true
    });
	
	res.status(200).json({
		status: 'success',
		data: user
	})
})

// @desc Update password
// @route PUT /api/v1/auth/updatepassword
// @access Private
exports.updatePassword = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(
            new ErrorResponse('Passowrd is incorrect', 401)
        )
    }

    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
})


// Get token from model, create cookie and send response
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
