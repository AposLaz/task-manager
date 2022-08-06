const express = require('express')
const router = new express.Router()
const TaskSchema = require('../schema/v1/tasks')
const CRUD = require('./functions/FUNCTIONS_task')

/*
                POST API
*/

router.post('/tasks', (req,res)=>{
    
    try{
        CRUD.create_task(req.body,(err,result) =>{
            if(err){
                res.status(400).send(err)
            }
            else{
                res.status(201).send('Task is '+ result) 
            }
        })
    }
    catch{
        res.status(500).send('Something gone Wrong in FUNCTION_task create_task')
    }
    
})


/*
                GET API
*/

router.get('/tasks',(req,res)=>{

    try{
        CRUD.get_all_tasks((err,tasks)=>{
            if(err){
                res.status(400).send(err)
            }
            else{
                res.status(200).send(tasks)
            }
        })
    }
    catch{
        res.status(500).send('Something gone wrong in function get_all_tasks')
    }
    
})


router.get('/tasks/:id',(req,res)=>{

    try{
        const id = req.params.id

        CRUD.get_task_by_id(id,(err,task)=>{
        
            if(err){
                res.status(404).send(err)
            }else{
                res.status(200).send(task)
            }
        })
    }
    catch{
        res.status(500).send('Something gone wrong in function get_tasks_by_id')
    }
    
})


/*
                PATCH API
*/

router.patch('/tasks/:id', (req,res)=>{
    
    try{
        const id = req.params.id
        const update_request_body = req.body

        CRUD.update_task_by_id(id,update_request_body,(err,status_code,Update_task)=>{
            
            if(err){
                res.status(status_code).send(err)
            }else{
                res.status(status_code).send(Update_task)
            }
            
        })
    }
    catch{
        res.status(500).send('Something gone wrong in function update_task_by_id')
    }   
})


/*
                DELETE API
*/

router.delete('/tasks/:id',(req,res)=>{

    const id = req.params.id
    console.log(req.params.id)
    try{
        CRUD.delete_task_by_id(id,(err,status_code, deleted_task)=>{
            if(err){
                res.status(status_code).send(err)
            }else{
                res.status(status_code).send('Task with name : '+deleted_task.description +' deleted Succesfully')
            }
        })
    }
    catch{
        res.status(500).send('Something gone wrong in function delete_task_by_id')
    }
    


})


module.exports = router