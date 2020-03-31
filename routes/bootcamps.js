const express = require('express');
const {getBootcamps, 
  getBootcamp,
  createBootcamp, 
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controller/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

// Include other resources router
const courseRouter = require('./courses')
const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp)

router  
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius)

router  
  .route('/:id/photo')
  .put(protect, bootcampPhotoUpload)


module.exports = router;