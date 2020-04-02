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
    if (req.params.bootcampId) {
        const courses = await Course.find({bootcamp : req.params.bootcampId})
        return res.status(200).json({
            status: 'success',
            count: courses.length,
            data: courses
        })
    } else {
       res.status(200).json(res.advancedResults)
    }
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
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
        return next(
            new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`,404)
            )
    }

    // Make suer user is owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
          new ErrorResponse(`User not authorized to change this bootcamp.`, 404)
        );
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

    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
          new ErrorResponse(`User not authorized to update this course.`, 404)
        );
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

    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
          new ErrorResponse(`User not authorized to delete this course.`, 404)
        );
    }

    await course.remove()
    res.status(200).json({
        status: 'success',
        data: {}
    })
})