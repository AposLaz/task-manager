const mongoose = require('mongoose')

//task-manager-api is our databse

const connectDB = (callback)=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err)=>{
        if (err){
            callback(err)
        }
        callback('Connected succesfully in DB')
    })
    
}

module.exports = connectDB