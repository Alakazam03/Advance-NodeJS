//@desc logs requests to console
const logger = (req, res, next) => {
    req.hello = 'World';
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
  
  }

module.exports = logger;