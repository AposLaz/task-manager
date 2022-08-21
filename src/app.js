const express = require('express')
const connectDB = require('./db/mongoose')
const userAPI = require('./controller/users')
const taskAPI = require('./controller/tasks')

connectDB((data)=>{
    console.log(data)
})

const app = express()

//accept only json format
app.use(express.json())

//APIs
app.use(userAPI)
app.use(taskAPI)

module.exports = app
