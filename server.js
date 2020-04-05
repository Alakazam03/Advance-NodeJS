'use strict'
const express = require('express')
const dotenv = require("dotenv")
const morgan = require('morgan');
const connectDB = require('./config/db')
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const rateLimit = require("express-rate-limit");
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
var xss = require('xss-clean');
var hpp = require('hpp');
const cors = require('cors');


//load env
dotenv.config({ path: './config/config.env'});
//connect to DB
connectDB();

//route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')

const app = express();

//bosy parser
app.use(express.json())
// cookie-parser
app.use(cookieParser())

//dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

// File uploads
app.use(fileupload())

// Set security
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors())

// mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))

// Hnadled or unhandled promise rejection
process.on('unhanledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
})