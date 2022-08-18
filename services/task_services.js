const TaskSchema = require("../model/v1/tasks");


const validate_keys_request = (id,update_request_body,callback) =>{
    const keys_update = Object.keys(update_request_body)
    const AllowUpdates = ['description','completed']

    const ValidateUpdatesOperation = keys_update.every((key)=>{
        return AllowUpdates.includes(key)
    })
    callback(ValidateUpdatesOperation,keys_update)
} 

/*
            CREATE TASK AND SAVE TO DATABASE
*/

const create_task = (task,user,callback)=>{

        //get schema
        const task_schema = new TaskSchema({
            ...task,
            owner: user._id
        })
        
        //save to db
        task_schema.save()
        .then((data)=>{
            callback(undefined, data)
        })
        .catch((e)=>{
            callback('Something gone wrong in CREATE_task '+e.message, undefined)
        })
}

/*
            GET ALL TASKS FOR A SPECIFIC USER
*/

const get_all_my_tasks = async (user,callback)=>{
    try{
        await user.populate('tasks').execPopulate() 
        callback(undefined, 200, user.tasks)
    }
    catch(e){
        callback('Something gone wrong in tasks for user: '+user.email+' Error : '+e.message,400,undefined)
    }
    
}

/*
            GET ALL TASKS FOR ALL USERS
*/

const get_all_tasks = (callback)=>{
    
    TaskSchema.find({}).select({ _id: 0, __v: 0 })
    .then((tasks)=>{
        callback(undefined,tasks)
    })
    .catch((e)=>{
        callback('Something gone wrong in find get_all_tasks '+e.message,undefined)
    })
}

/*
            GET TASK BY ID
*/

const get_task_by_id = (id,user,callback)=>{
    
    TaskSchema.findOne({description: id, owner: user._id}).select({ _id: 0, __v: 0 })
    .then((tasks)=>{
        if(!tasks){
            callback('Task did not found',undefined)
        }
        callback(undefined,tasks)
    })
    .catch((e)=>{
        callback('Something gone wrong in find get_task_by_id '+e.message,undefined)
    })

}

/*
        UPDATE TASKS BY DESCRIPTION (ID) UPDATE ONLY MINE FUNCTION
*/

const update_my_task_by_id = (id,update_request_body, user,callback)=>{
    
    validate_keys_request(id,update_request_body, (boolean,keys_update)=>{
        
        if(!boolean){
            callback('Error: Invalid Updates',400,undefined)
        }
        
        TaskSchema.findOne({description: id, owner: user._id}).select({ __v: 0 })
        .then((task)=>{
            
            if(!task){
                callback("Task "+id+" does not exist",404,undefined)
            }
            
            keys_update.forEach((value)=>{
                task[value] = update_request_body[value]
            })

            task.save()
            .then((update_task)=>{
                callback(undefined,200,update_task)
            })
            .catch((e)=> callback('Something Gone wrong in ``` SAVE ``` function update_task_by_id '+e.message,500,undefined))
        })
        .catch((err)=> callback('Something Gone wrong in ``` FIND ONE ``` function update_task_by_id '+err.message,500,undefined))

    })

}


/*
        UPDATE TASKS BY DESCRIPTION (ID) ADMIN FUNCTION
*/


const update_task_by_id = (id,update_request_body,callback)=>{
    
    validate_keys_request(id,update_request_body, (boolean,keys_update)=>{
        
        if(!boolean){
            callback('Error: Invalid Updates',400,undefined)
        }
        
        TaskSchema.findOne({description: id}).select({ __v: 0 })
        .then((task)=>{
            
            if(!task){
                callback("Task "+id+" does not exist",404,undefined)
            }
            
            keys_update.forEach((value)=>{
                task[value] = update_request_body[value]
            })

            task.save()
            .then((update_task)=>{
                callback(undefined,200,update_task)
            })
            .catch((e)=> callback('Something Gone wrong in ``` SAVE ``` function update_task_by_id '+e.message,500,undefined))
        })
        .catch((err)=> callback('Something Gone wrong in ``` FIND ONE ``` function update_task_by_id '+err.message,500,undefined))

    })

}


/*
                DELETE TASK BY ID
*/
//----------------------------------------------------------------------------------------------------USER FUNCTION

const delete_my_task_by_id = (id, user, callback)=>{
   
    TaskSchema.findOneAndDelete({description: id, owner: user._id}).select({_id: 0, __v:0})
    .then((data)=>{
        if(!data){
             callback("Invalid Task description : "+id,404,undefined)
        }
        callback(undefined,200,data)
    })
    .catch((e)=>{
        callback('Something Gone wrong in DELETE_TASK_BY_ID '+e,500,undefined)
    })  

}


//----------------------------------------------------------------------------------------------------ADMIN FUNCTION
const delete_task_by_id = (id, callback)=>{
   
    TaskSchema.findOneAndDelete({description: id}).select({_id: 0, __v:0})
    .then((data)=>{
        if(!data){
             callback("Invalid Task description : "+id,404,undefined)
        }
        callback(undefined,200,data)
    })
    .catch((e)=>{
        callback('Something Gone wrong in DELETE_TASK_BY_ID '+e,500,undefined)
    })  

}




module.exports = {
    create_task,
    get_all_tasks,
    get_task_by_id,
    update_task_by_id,
    delete_task_by_id,
    get_all_my_tasks,
    update_my_task_by_id,
    delete_my_task_by_id
};