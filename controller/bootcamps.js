const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/aysnc')
const geocoder = require('../utils/geocoder')


// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
   // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to remove
  const removeFields = ['select', 'sort'];
  removeFields.forEach(param => delete reqQuery[param]);
  
  // Create query string
  let queryString = JSON.stringify(reqQuery);

  // console.log(reqQuery)
  // Create operators ($gte, $lte)
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
  query = Bootcamp.find(JSON.parse(queryString));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    console.log(fields);
    query = query.select(fields);
  } 

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }
  
  // Execute query
  const bootcamps = await query;
  res.status(200).json({
    status: 'success',
    code: res.statusCode,
    count: bootcamps.length,
    message: 'Required bootcamp',
    data: bootcamps
  })

  // Bootcamp.find(query, (err, data) => {
  //   if(err) {
  //     res.status(400).json({
  //       status: 'failure',
  //       code: res.statusCode,
  //       message: 'bootcamp not found'
  //     })
  //   }
  //   else{
  //     res.status(200).json({
  //       status: 'success',
  //       code: res.statusCode,
  //       count: data.length,
  //       message: 'Required bootcamp',
  //       data: data
  //     })
  //   }
  // })
    
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
exports.createBootcamp = (req, res, next) => {
    // console.log(req);
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
  Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }, (err, data) => {
    if(err) {
      console.log(err)
      res.status(500).json({
        status: 'failure',
        code: res.statusCode,
        message: 'bootcamp not created'
      })
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
    res.status(200).json({
        status: 'success',
        code: res.statusCode,
        message: `update bootcamp for ${req.params.id}`
      })
}

// @desc Delete single bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        code: res.statusCode,
        message: `delete bootcamp ${req.params.id}`
      })
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