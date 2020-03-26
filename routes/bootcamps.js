const express = require('express');
const {getBootcamps, 
  getBootcamp,
  createBootcamp, 
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controller/bootcamps')

// Include other resources router
const courseRouter = require('./courses')
const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp)

router  
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius)

module.exports = router;