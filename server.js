'use strict'
const express = require('express')
const dotenv = require("dotenv")
// const logger = require('./middleware/logger')
const morgan = require('morgan');
const connectDB = require('./config/db')
const colors = require('colors');
const errorHandler = require('./middleware/error');




//load env
dotenv.config({ path: './config/config.env'});
//connect to DB
connectDB();

//route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const app = express();

//bosy parse
app.use(express.json())
//dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}


// mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))

// Hnadled or unhandled promise rejection
process.on('unhanledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
})