const express = require('express');
const { getCourses, 
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse} = require('../controller/courses')

const advancedResults = require('../middleware/advancedResults');
const Course = require('../models/Course');

const router = express.Router({ mergeParams : true });


router
    .route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name description'
    }), getCourses)
    .post(addCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse);
    

module.exports = router;