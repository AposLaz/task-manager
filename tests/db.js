const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserModel = require('../src/model/v2/users')

//create a new Id for Admin
const AdminUserId = new mongoose.Types.ObjectId()

//create a new Id for Simple
const SimpleUserId = new mongoose.Types.ObjectId()

const AdminUser = {
    _id: AdminUserId,
    name: "ApostolosLazidis",
    email: 'aplazidisaasd@gmail.com',
    password: '1234567',
    age: 26,
    role: 'ADMIN',
    tokens: [{
        token: jwt.sign({_id: AdminUserId}, process.env.JWT_TOKEN_SECRET)
    }]
}

const SimpleUser = {
    _id: SimpleUserId,
    name: "ApLaz",
    email: 'aplazidis@gmail.com',
    password: '1234567!22',
    age: 26,
    role: 'USER',
    tokens:[{
        token: jwt.sign({_id: SimpleUserId}, process.env.JWT_TOKEN_SECRET)
    }]
}


const InitializeDatabase = async()=>{
    await UserModel.deleteMany()        //delete all users from db
    await new UserModel(AdminUser).save()        //save admin user for test cases
}


module.exports = {
    AdminUserId,
    SimpleUserId,
    AdminUser,
    SimpleUser,
    InitializeDatabase
}