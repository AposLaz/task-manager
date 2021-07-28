const mongoose = require('mongoose')
const UserSchema = require('../schema/v1/users')
const bcrypt = require('bcryptjs')

const login = async (credentials) =>{
    
    if(!credentials.email && !credentials.password){
        throw new Error("You must provide credentials")
    }
    else if(!credentials.email){
        throw new Error("You must provide a email")
    }
    else if(!credentials.password){
        throw new Error("You must provide a password")
    }
    else{

        //find the user by email
        const user = await UserSchema.findOne({email: credentials.email}).select({ __v: 0})
        
        if(!user){
            throw new Error("The is not a user with this email")
        }

        //check if password is correct
        const decrypt = await bcrypt.compareSync(credentials.password, user.password);
        
        if(!decrypt){
            throw new Error("Wrong password")
        }

        return user
    }

}

module.exports = login
