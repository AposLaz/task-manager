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

//----------------------------------------------------- JWT
/*
const jwt = require('jsonwebtoken')

const auth0 =  async ()=>{
    const token = await jwt.sign({ _id: "abc"}, 'mypwd', { expiresIn: ''})

    return token
}

auth0()
.then((token)=>{

    const validUser =  jwt.verify(token, 'mypwd')
    console.log(validUser)
})
.catch((e)=>{
    console.log(e)
})
*/

//----------------------------------------------------- ENCRYPT - DECRYPT
/* const bcrypt = require('bcryptjs');

const encrypt = async ()=>{
    const password = 'aplaz'
    const hash = await bcrypt.hash(password, 8)

    //console.log(password)
    return hash
}

const decrypt = async (hash)=>{
    const pwd = await bcrypt.compareSync("aplaz", hash); // true
    console.log(pwd)
}

encrypt()
.then((data)=>{
    console.log(data)
    decrypt(data)
})
.catch((e)=>{
    console.log("Error "+ e)
})
 */