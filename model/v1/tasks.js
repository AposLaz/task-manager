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
    }
})

module.exports = TaskSchema