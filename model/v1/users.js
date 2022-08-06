const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fs = require('fs')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('It is not an Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password is not safe. Do not use word password.')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    date: {
        type: Date, 
        default: Date.now
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//Generate Auth Token

UserSchema.methods.generateAuthToken = async function(){ 
    
    const user = this
    
    const cert = fs.readFileSync('public.pem')
    const token = jwt.sign({_id : user._id.toString()}, cert.toString())

    user.tokens = user.tokens.concat({token})
    
    await user.save()
    
    return token
}


//Login User with credentials

UserSchema.statics.Login_find_credentials = async (credentials) =>{
    
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
        const user = await UserModel.findOne({email: credentials.email}).select({ __v: 0})
        
        if(!user){
            throw new Error("The is not a user with this email")
        }

        //check if password is correct
        const isMatch = await bcrypt.compareSync(credentials.password, user.password);
        
        if(!isMatch){
            throw new Error("Wrong password")
        }

        return user
    }
}

//HASH password. run code before user is saved
UserSchema.pre('save', async function(next) {

    if(!this.trial){
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 8)
        }
    }    

    next()
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel