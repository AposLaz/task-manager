const express = require('express')
const router = new express.Router()
const UserSchema = require('../model/v1/users')
const UserModel = require('../validate/login')
const auth = require('../validate/auth')


router.post('/users', async (req,res)=>{
    const user = new UserSchema(req.body)
   
    try{
        await user.save()
        .then(async (user_data)=>{
            const token  = await user_data.generateAuthToken()
            res.status(201).send({user_data, token})
        })
        .catch((e)=>{
            res.status(400).send('Error '+e)
        })
    }
    catch{
        res.status(500).send('Error '+e)
    }
    
})

router.post('/users/login', async (req,res)=>{
    const credentials = req.body 

    try{
        const user = await UserSchema.Login_find_credentials(credentials)
        
        const token = await user.generateAuthToken()
        
        res.status(200).send({user, token})
    }
    catch(e){
        res.status(500).send(e+'222')
    }
    
})

router.post('/users/logout', auth, async (req, res)=>{
    try{
        //return tokens without the token that we want to delete
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        //when we return tokens without the token that we want to delete save it
        await req.user.save() 
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(401).send('Error in Logout')
    }
})

router.post('/users/logoutAll', auth, async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send({Error: "Can not logout all users"})
    }
})

router.get('/users/me', auth, (req,res)=>{
    res.send(req.user)
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