const mongoose = require('mongoose')

//task-manager-api is our databse

const connectDB = (callback)=>{
    mongoose.connect('mongodb://mongo:27017/task-manager-api', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    callback('Connected succesfully in DB')
}

module.exports = connectDB