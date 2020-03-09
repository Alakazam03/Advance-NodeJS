'use strict'
const express = require('express')
const dotenv = require("dotenv")


//route files
const bootcamps = require('./routes/bootcamps')
//load env
dotenv.config({ path: './config/config.env'});
const app = express();

//mount 
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Started is running in ${process.env.NODE_ENV} on port ${PORT}`))

