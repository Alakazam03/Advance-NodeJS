const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Load env vats
dotenv.config({path: './config/config.env'})

//Load models
const Bootcamp = require('./models/Bootcamp')
const Course = require('./models/Course')
const User = require('./models/User')


//Connnect to db
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify: true,
    useUnifiedTopology: true 
});

// read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));


// Load data to db
const importData = async () => {
    try{
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);
        console.log("data imported...".green.inverse)
        process.exit()
    }
    catch (error) {
        console.log(error);
    }
}


// Delete data
const deleteData = async () => {
    try{
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        console.log("data destroyed".red.inverse)
        process.exit()
    }
    catch(error) {
        console.log(error)
    }
}

if(process.argv[2] === '-i'){
    importData()
}
else if (process.argv[2] === '-d'){
    deleteData()
}