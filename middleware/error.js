const errorHandler = (err, req, res, next) => {
    //log to console for dev
    console.log(err.stack.red)
    res.status(err.statusCode || 500).json({
        status: 'failure',
        error: err.message || 'Server Error.'
    })
}

module.exports = errorHandler;