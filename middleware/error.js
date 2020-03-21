const ErrorResponse = require('../utils/errorResponse')


const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message;
    //log to console for dev
    console.log(err)
    //Mongoose bad object id
    if (err.name === 'CastError') {
        const errorMessage = `Resource not found with id of ${err.value}.`;
        error = new ErrorResponse(errorMessage, 404);
    }
    else if (err.name === 'Error') {
        console.log("Fdf")
        const errorMessage = 'Server error';
        error = new ErrorResponse(errorMessage, 500);
    }
    else if (err.code === 11000) {
        const errorMessage = `Duplicates field values entered`;
        error = new ErrorResponse(errorMessage, 400)
    }
    else if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(errorMessage, 400);
    }
    res.status(error.statusCode || 500).json({
        status: 'failure',
        error: error.message || 'Server Error.'
    })
}

module.exports = errorHandler;