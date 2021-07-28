const jwt = require('jsonwebtoken')
const fs = require('fs')

const generateAuthToken = async (user) =>{
    const cert = fs.readFileSync('public.pem')
    const token = jwt.sign({_id : user._id.toString()}, cert.toString())

    user.tokens = user.tokens.concat({token})
    
    await user.save()
    
    return token
}

module.exports = generateAuthToken