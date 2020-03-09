'use strict'
const express = require('express')
const dotenv = require("dotenv")

//load env
dotenv.config({ path: './config/config.env'});
const app = express();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  console.log(req)
  const {headers, url, method} = req
  console.log(headers, url, method)
  res.end()
})
server.listen(3000, () => console.log('Started'))

