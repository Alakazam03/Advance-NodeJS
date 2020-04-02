const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/aysnc')
const geocoder = require('../utils/geocoder')


// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
    
})


// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  Bootcamp.findById(req.params.id, (err, data) => {
    if(err) {
      next(err)
    }
    else{
      if(!data) {
        return next(err)
      }
      res.status(200).json({
        status: 'success',
        code: res.statusCode,
        data: data
      })
    }
  })
}

// @desc Create single bootcamps
// @route POST /api/v1/bootcamps/
// @access Private
exports.createBootcamp = async (req, res, next) => {
  // Add user
  req.body.user = req.user.id;

  // Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // If user is not an admin, he cant add more than one course
  if (publishedBootcamp && req.user.role !== 'admin') {
    return next (
      new ErrorResponse(`The user id ${req.user.id} has already published a bootcamp.`, 400)
    );
  }
  Bootcamp.create(req.body, (err, data) => {
      if(err) {
        next(err)
      }
      else{
        res.status(200).json({
          status: 'success',
          code: res.statusCode,
          message: 'created new bootcamp',
          data: data
        })
      }
    })
    
}

// @desc Update single bootcamps
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.updateBootcamp = (req, res, next) => {
  Bootcamp.findById(req.params.id, (err, bootcamp) => {
    if(err) {
      console.log(err)
      res.status(500).json({
        status: 'failure',
        code: res.statusCode,
        message: 'bootcamp not found'
      })
    }
    else{
      if (!bootcamp) {
        return next(
          new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
      }
      // make sure user is owner
      if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
          new ErrorResponse(`User  not authorized to change ${req.params.id}`, 404)
        );
      }
    }
  })

  Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }, (err, bootcamp) => {
    if (error) {
      res.status(500).json({
        status: 'failure',
        code: res.statusCode,
        message: 'bootcamp not found'
      })
    } else {
      res.status(200).json({
        status: 'success',
        code: res.statusCode,
        message: 'created new bootcamp',
        data: bootcamp
      })
    }
  })
    // res.status(200).json({
    //     status: 'success',
    //     code: res.statusCode,
    //     message: `update bootcamp for ${req.params.id}`
    //   })
}

// @desc Delete single bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
  Bootcamp.deleteOne(req.params.id, (error, data) => {
    if (error) {
      res.status(400).json({
        status: 'failure',
        message: 'Bootcamp could not be deleted.'
      })
    } 
    else {
      res.status(200).json({
        status: 'success',
        message: 'Bootcamp deleted.'
      })
    }
  })
    // res.status(200).json({
    //     status: 'success',
    //     code: res.statusCode,
    //     message: `delete bootcamp ${req.params.id}`
    //   })
}

// @desc GET  bootcamps within radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const {zipcode, distance} = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //Calc radius 
  // divide radians by radius
  // earth radius = 3963 miles/6378 kms
  const radius = distance / 6978;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: {$centerSphere: [[ lat, lng ], radius ]}}
  });

  res.status(200).json({
    status: 'success',
    data: bootcamps,
    count: bootcamps.length
  })

})

// @desc upload photo for bootcamps
// @route PUT /api/v1/bootcamps/:id/photo
// @access Private
exports.bootcampPhotoUpload = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.param.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    )
  }
  // make sure user is owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(
      new ErrorResponse(`Please upload file.`, 404)
    )
  }
  const file = req.files.file;

  // Make sure image is a photo (jpeg, png)
  if (!file.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse(`Please upload an image file`, 404)
    )
  }

  res.status(200).json({
      status: 'success',
      code: res.statusCode,
      message: `delete bootcamp ${req.params.id}`
    })
})