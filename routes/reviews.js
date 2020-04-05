const express = require('express');
const { getReviews, getReview,
     addReview, updateReview,
    deleteReview} = require('../controller/reviews')

const advancedResults = require('../middleware/advancedResults');
const Review = require('../models/Review');

const router = express.Router({ mergeParams : true });

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(advancedResults(Review, {
            path: 'Bootcamp',
            select: 'name decription'
        }), getReviews)
    .post(protect, authorize('user', 'admin'), addReview)

router
    .route('/:id')
    .get(getReview)
    .put(protect, authorize('user', 'admin'), updateReview)
    .delete(protect, authorize('user', 'admin'), deleteReview);
    
module.exports = router;