const jwt = require('jsonwebtoken')
const UserSchema = require('../schema/v1/users')
const fs = require('fs')

const auth = async(req, res, next)=>{

    try{
        const bearer_token = req.header('Authorization').replace('Bearer ','')
        const cert = fs.readFileSync('public.pem')
        const decoded = jwt.verify(bearer_token, cert.toString())
        //console.log(decoded._id)
        const user = await UserSchema.findOne({_id: decoded._id, 'tokens.token': bearer_token})
        
        if(!user){
            throw new Error("Invalid authorization. User does not exists or do not have permissions.")
        }

        req.token = bearer_token
        req.user = user
        next()
    }
    catch (e){
        res.status(401).send({Error: 'Error in authentication'})
    }
}

module.exports = auth