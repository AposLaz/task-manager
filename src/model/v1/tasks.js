const mongoose = require('mongoose')
const validator = require('validator')

const TaskSchema = new mongoose.model('Task',{
    description :{
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date : {
        type: Date, 
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'         //const UserModel = mongoose.model('User' ****** This is the name that i need, UserSchema)
    }
})

module.exports = TaskSchema