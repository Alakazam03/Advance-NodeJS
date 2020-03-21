class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message); //calling error class
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;