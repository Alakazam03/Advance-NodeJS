const errorHandler = (err, req, res, next) => {
    //log to console for dev
    console.log(err.stack.red)
    res.status(500).json({
        status: 'failure',
        error: err.message
    })
}

module.exports = errorHandler;