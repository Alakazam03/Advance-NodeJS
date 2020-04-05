const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/aysnc')

// GET all reviews
// GET all courses by a bootcamp
// @desc Get all reviews
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Review.find({bootcamp : req.params.bootcampId})
        return res.status(200).json({
            status: 'success',
            count: reviews.length,
            data: reviews
        })
    } else {
       res.status(200).json(res.advancedResults)
    }
});

// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'Bootcamp',
        select: 'name decription'
    })

    if (!review) {
        return next(
            new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        status: 'success',
        data: review
    })
});

// @desc Add single review
// @route POST /api/v1/bootcamps/:bootcampId/reviews
// @access Private
exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    const review = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: review
    })
});

// @desc Update single review
// @route PUT /api/v1/reviews/:reviewId
// @access Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    // req.body.bootcamp = req.params.bootcampId;
    // req.body.user = req.user.id;

    const review = await Bootcamp.findById(req.params.reviewId);

    if (!review) {
        return next(
            new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
        );
    }

    if (review.user.toString() !== req.user.id || req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`not authorized to update review ${req.params.id}`, 401)
        );
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
        new: true,
        runValidators: true
    });

    res.status(201).json({
        status: 'success',
        data: updatedReview
    })
});

// @desc Delete single review
// @route PUT /api/v1/reviews/:reviewId
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    // req.body.bootcamp = req.params.bootcampId;
    // req.body.user = req.user.id;

    const review = await Bootcamp.findById(req.params.reviewId);

    if (!review) {
        return next(
            new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
        );
    }

    if (review.user.toString() !== req.user.id || req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`not authorized to update review ${req.params.id}`, 401)
        );
    }

    await Review.remove(req.params.reviewId);

    res.status(201).json({
        status: 'success',
        data: {}
    })
});


