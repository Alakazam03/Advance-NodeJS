const asyncHandler = require('../middleware/aysnc');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');

// @desc Get all users
// @route GET /api/v1/auth/users
// @access Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})

// @desc Get single user
// @route GET /api/v1/auth/user/:id
// @access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById( req.params.id);

    res.status(200).json({
        status: 'success',
        data: user
    })
})

// @desc Create single user
// @route POST /api/v1/auth/user/:id
// @access Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create( req.body);

    res.status(201).json({
        status: 'success',
        data: user
    })
})

// @desc Update  user
// @route PUT /api/v1/auth/user/:id
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(201).json({
        status: 'success',
        data: user
    })
})

// @desc Delete  user
// @route DELETE /api/v1/auth/user/:id
// @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete( req.params.id);

    res.status(201).json({
        status: 'success',
        data: {}
    })
})


