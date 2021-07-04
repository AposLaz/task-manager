const express = require('express')
const router = new express.Router()
const TaskSchema = require('../schema/v1/tasks')

router.post('/tasks', (req,res)=>{
    const task = new TaskSchema(req.body)

    task.save()
    .then((data)=>{
        res.status(201).send('Task is '+ data)
    })
    .catch((e)=>{
        res.status(400).send(e.message)
    })
})

router.get('/tasks',(req,res)=>{

    TaskSchema.find({}).select({ _id: 0, __v: 0 })
    .then((tasks)=>{
        res.status(200).send(tasks)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})

router.get('/tasks/:id',(req,res)=>{

    const id = req.params.id

    TaskSchema.findOne({description: id}).select({ _id: 0, __v: 0 })
    .then((tasks)=>{
        if(!tasks){
            return res.status(404).send('Task did not found')
        }
        res.status(200).send(tasks)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})


router.patch('/tasks/:id',(req,res)=>{

    const id = req.params.id
    const update = req.body

    const keys_update = Object.keys(update)
    const AllowUpdates = ['description','completed']

    const ValidateUpdatesOperation = keys_update.every((key)=>{
        return AllowUpdates.includes(key)
    })

    if(!ValidateUpdatesOperation){
        return res.status(400).send("Error: Invalid Updates")
    }

    TaskSchema.findOneAndUpdate({description: id},update, {projection: {_id: 0, __v: 0}, new: true, runValidators: true})
    .then((result)=>{
        if(!result){
            return res.status(404).send("Task "+id+" does not exist")
        }

        res.status(200).send(result)
    })
    .catch((e)=>{
        res.status(500).send(e.message)
    })
})

router.delete('/tasks/:id',(req,res)=>{

    const id = req.params.id
    console.log(req.params.id)

    TaskSchema.findOneAndDelete({description: id}).select({_id: 0, __v:0})
    .then((data)=>{
        if(!data){
            return res.status(404).send("Invalid Task "+id)
        }
        res.status(200).send(data)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})


module.exports = router