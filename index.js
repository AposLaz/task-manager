const express = require('express')
const connectDB = require('./db/mongoose')
const userAPI = require('./api/users')
const taskAPI = require('./api/tasks')

const port = process.env.PORT || 3000


connectDB((data)=>{
    console.log(data)
})

const app = express()

//accept only json format
app.use(express.json())

//APIs
app.use(userAPI)
app.use(taskAPI)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

