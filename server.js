'use strict'
const express = require('express')
const dotenv = require("dotenv")
const morgan = require('morgan');
const connectDB = require('./config/db')
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');


//load env
dotenv.config({ path: './config/config.env'});
//connect to DB
connectDB();

//route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

const app = express();

//bosy parser
app.use(express.json())
//dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

// File uploads
app.use(fileupload())

// mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))

// Hnadled or unhandled promise rejection
process.on('unhanledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
})