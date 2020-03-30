const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aysnc');
const User = require('../models/User');


// @desc Register user
// @route /api/v1/auth/register
exports.register = asyncHandler(async(req, res, next) => {
    res.status(200).json({
        'success': true
    })
})