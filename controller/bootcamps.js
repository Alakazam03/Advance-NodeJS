// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        code: res.statusCode,
        message: 'show all bootcamps',
      })
}

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        code: res.statusCode,
        message: `show bootcamp ${req.params.id}`
      })
}

// @desc Create single bootcamps
// @route POST /api/v1/bootcamps/
// @access Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        code: res.statusCode,
        message: 'create new bootcamp'
      })
}

// @desc Update single bootcamps
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.updateBootcamp = (req, res, next) => {
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