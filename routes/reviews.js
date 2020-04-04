const express = require('express');
const { getReviews, getReview} = require('../controller/reviews')

const advancedResults = require('../middleware/advancedResults');
const Review = require('../models/Review');

const router = express.Router({ mergeParams : true });

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(advancedResults(Review, {
            path: 'Bootcamp',
            select: 'name decription'
        }), getReviews);

router
    .route('/:id')
    .get(getReview);
    

module.exports = router;