const jwt = require('jsonwebtoken')
const UserSchema = require('../model/v2/users')
require('dotenv').config()

const auth = async(req, res, next)=>{

    try{
        const bearer_token = req.header('Authorization').replace('Bearer ','')
        // const cert = fs.readFileSync('public.pem')
        const decoded = jwt.verify(bearer_token, process.env.JWT_TOKEN_SECRET)
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