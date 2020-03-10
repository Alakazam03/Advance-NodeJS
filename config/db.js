const mongoose = require('mongoose');

//call within server.js 
const connectDB = async () => {
    const connection  = await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useFindAndModify: true,
        useUnifiedTopology: true 
    })
    console.log(`Mongo db connected to ${connection.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB