const express = require('express')
const router = new express.Router()
const UserSchema = require('../model/v1/users')
const auth = require('../middleware/auth')
const CRUD = require('../services/user_services')

// ---------------------------------------------------------------------------------    SIMPLE USER FUNCTIONS

router.post('/users', async (req,res)=>{
    try{
         CRUD.sign_up_user(req.body,(err,status_code,user_data,token)=>{
            if(err){
                res.status(status_code).send('Error '+err)
            }
            else{
                res.status(status_code).send({user_data, token})
            }
        })
    }
    catch{
        res.status(500).send('Error '+err)
    }
})

router.post('/users/login', async (req,res)=>{
    try{
        CRUD.login_user(req.body,(err,status_code,user,token)=>{
            if(err){
                console.log(err)
                res.status(status_code).send(err)
            }
            else{
                res.status(status_code).send({user,token})
            }
        })
    }
    catch(err){
        res.status(500).send(err)
    }

    
})

router.post('/users/logout', auth, async (req, res)=>{

    const user = req.user

    try {
        CRUD.logout_user(user, req.token, (err,status_code, response_user)=>{
            if(err){
                res.status(status_code).send(err)
            }
            else{
                res.status(status_code).send(response_user)
            }
        })
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req,res)=>{

    const user = req.user

    try{
        CRUD.logout_all_tokens(user,(err,status_code,response_user)=>{
            if(err){
                res.status(status_code).send(err)
            }
            else{
                res.status(status_code).send(response_user)
            }
        })
    }
    catch(e){
        res.status(500).send({Error: "Can not logout all users"})
    }
})

router.get('/users/me', auth, (req,res)=>{
    res.send(req.user)
})


/*
        UPDATE MY PROFILE
*/

router.patch('/users/me', auth,async (req,res)=>{
    
    const user = req.user
    const update = req.body

    const myUpdates = Object.keys(update)
    const AllowUpdates = ['name','email','password','age']

    const updateValidateOperation = myUpdates.every((key)=>{
        return AllowUpdates.includes(key)
    })

    if(!updateValidateOperation){
        return res.status(400).send('Error: Invalid Updates')
    }

    try{
        CRUD.update_user(user,myUpdates, update,(err,status_code,response_data)=>{
            if(err){
                res.status(status_code).send(err)
            }
            res.status(status_code).send(response_data)
        })
    }
    catch(e){
        res.status(500).send(e.message)
    }
    

    
})


/*
        DELETE MY PROFILE
*/

router.delete('/users/me',auth,(req,res)=>{

    const user = req.user

    try{
        CRUD.remove_user_account(user,(err,status_code,response_data)=>{
            if(err){
                res.status(status_code).send(err)
            }
            res.status(status_code).send(response_data)
        })
    }
    catch(e){
        res.status(500).send(e)
    }
    

})

// ---------------------------------------------------------------------------------    ADMIN FUNCTIONS

router.get('/users/:id',(req,res)=>{


    const id = req.params.id

    try{
        CRUD.get_user_by_name_admin_function(id,(err,status_code,response_data)=>{
            if(err){
                res.status(status_code).send(err)
            }
            res.status(status_code).send(response_data)
        })
    }
    catch(e){
        res.status(500).send(e.message)
    }
    

    
})

router.patch('/users/:id', async (req,res)=>{

    const id = req.params.id
    const update = req.body

    const myUpdates = Object.keys(update)
    const AllowUpdates = ['name','email','password','age']

    const updateValidateOperation = myUpdates.every((key)=>{
        return AllowUpdates.includes(key)
    })

    if(!updateValidateOperation){
        return res.status(400).send('Error: Invalid Updates')
    }

    try{
        CRUD.update_user_by_name_admin_function(id,myUpdates, update,(err,status_code,response_data)=>{
            if(err){
                res.status(status_code).send(err)
            }
            res.status(status_code).send(response_data)
        })
    }
    catch(e){
        res.status(500).send(e.message)
    }
    

    
})


/*
        DELETE OTHER USERS PROFILE
*/ 

router.delete('/users/:id',(req,res)=>{
    
    const id = req.params.id
    
    try{
        CRUD.delete_user_admin_function(id, (err,status_code,response_data)=>{
            if(err){
                res.status(status_code).send(err)
            }
            res.status(status_code).send(response_data)
        })
    
    }
    catch(e){
        res.status(500).send(e)
    }

})


module.exports = router