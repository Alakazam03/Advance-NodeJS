const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/aysnc')


// GET all courses
// GET all courses by a bootcamp
// @desc Get all courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;
    if (req.params.bootcampId) {
        query = Course.find({bootcamp : req.params.bootcampId})
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;
    res.status(200).json({
        status: 'success',
        count: courses.length,
        data: courses
    })
})

exports.getCourse = asyncHandler (async (req, res, next) => {
    let query;
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name descrition'
    });

    if (!course) {
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: course
    })
})


// @route POST /api/v1/bootcamps/:bootcampId/course
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
        return next(
            new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`,
            404))
    }

    const course = await Course.create(req.body);
    res.status(200).json({
        status: 'success',
        data: course
    })
})


// @desc UPDATE course
// @route PUT /api/v1/courses/:id
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`,
            404))
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: course
    })
})

// @desc Delete course
// @route DELETE /api/v1/courses/:id
// @access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`,
            404))
    }

    await course.remove()
    res.status(200).json({
        status: 'success',
        data: {}
    })
})