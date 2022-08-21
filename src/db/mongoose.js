const mongoose = require('mongoose')
require('dotenv').config()

//task-manager-api is our databse

const connectDB = (callback)=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    callback('Connected succesfully in DB')
}

module.exports = connectDB