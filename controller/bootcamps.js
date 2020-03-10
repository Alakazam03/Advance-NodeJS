const Bootcamp = require('../models/Bootcamp');


// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  Bootcamp.find({}, (err, data) => {
    if(err) {
      console.log(err)
      res.status(400).json({
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
        data: data,
        count: data.length
      })
    }
  })
    
}

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  Bootcamp.findById(req.params.id, (err, data) => {
    if(err) {
      console.log(err)
      res.status(400).json({
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
}

// @desc Create single bootcamps
// @route POST /api/v1/bootcamps/
// @access Private
exports.createBootcamp = (req, res, next) => {
    // console.log(req);
    Bootcamp.create(req.body, (err, data) => {
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