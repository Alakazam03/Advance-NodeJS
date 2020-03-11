class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message); //error class
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;