const express = require('express')
const router = new express.Router()
const UserSchema = require('../schema/v1/users')
const validate = require('../validate/login')
const generateAuthToken = require('../validate/generateToken')

router.post('/users', async (req,res)=>{
    const user = new UserSchema(req.body)
    user.save()
    .then(async (data)=>{
        const token  = await generateAuthToken(user)
        res.status(201).send({data, token})
    })
    .catch((e)=>{
        res.status(400).send('Error '+e)
    })
})

router.post('/users/login', async (req,res)=>{
    const credentials = req.body 

    try{
        const user = await validate(credentials)
        const token = await generateAuthToken(user)

        res.status(200).send({user, token})
    }
    catch(e){
        res.status(500).send(""+e)
    }
    
})

router.get('/users', (req,res)=>{
    UserSchema.find({}).select({ _id: 0, __v: 0 })
    .then((users)=>{
        res.send(users)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})

router.get('/users/:id',(req,res)=>{
    const id = req.params.id

    UserSchema.findOne({name: id}).select({ _id: 0, __v: 0 })
    .then((users)=>{
        if(!users){
            return res.status(404).send('User did not found')
        }

        res.send(users)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
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
            const user = await UserSchema.findOne({name: id}).select({__v: 0 })
            
            myUpdates.forEach((value)=>{
                user[value] = update[value]
            })

            await user.save()

            if(!user){
                return res.status(404).send("User "+id+" did not found")
            }
            res.status(200).send(user)

    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/:id',(req,res)=>{

    const id = req.params.id

    UserSchema.findOneAndDelete({name: id}).select({_id: 0, __v:0})
    .then((data)=>{
        if(!data){
            return res.status(404).send("Invalid User "+id)
        }
        res.status(200).send(data)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})


module.exports = router