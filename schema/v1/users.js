const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');

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
    }
})

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