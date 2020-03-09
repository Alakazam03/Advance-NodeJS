'use strict'
const express = require('express')
const dotenv = require("dotenv")
// const logger = require('./middleware/logger')
const morgan = require('morgan');
const connectDB = require('./config/db')



//load env
dotenv.config({ path: './config/config.env'});
//connect to DB
connectDB();

//route files
const bootcamps = require('./routes/bootcamps')
const app = express();

//dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}


//mount 
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, console.log(`Started is running in ${process.env.NODE_ENV} on port ${PORT}`))

// Hnadled or unhandled promise rejection
process.on('unhanledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})